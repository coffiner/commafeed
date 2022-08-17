import { t, Trans } from "@lingui/macro"
import { Anchor, Box, Button, Code, Container, Divider, Group, Input, NumberInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { openConfirmModal } from "@mantine/modals"
import { client, errorToStrings } from "app/client"
import { Constants } from "app/constants"
import { redirectToRootCategory, redirectToSelectedSource } from "app/slices/redirect"
import { reloadTree } from "app/slices/tree"
import { useAppDispatch, useAppSelector } from "app/store"
import { CategoryModificationRequest } from "app/types"
import { flattenCategoryTree } from "app/utils"
import { Alert } from "components/Alert"
import { CategorySelect } from "components/content/add/CategorySelect"
import { Loader } from "components/Loader"
import { useEffect } from "react"
import { useAsync, useAsyncCallback } from "react-async-hook"
import { TbDeviceFloppy, TbTrash } from "react-icons/tb"
import { useParams } from "react-router-dom"

export function CategoryDetailsPage() {
    const { id = Constants.categoryIds.all } = useParams()

    const apiKey = useAppSelector(state => state.user.profile?.apiKey)
    const dispatch = useAppDispatch()

    const query = useAsync(() => client.category.getRoot(), [])
    const category = query.result && flattenCategoryTree(query.result.data).find(c => c.id === id)

    const form = useForm<CategoryModificationRequest>()
    const { setValues } = form

    const modifyCategory = useAsyncCallback(client.category.modify, {
        onSuccess: () => {
            dispatch(reloadTree())
            dispatch(redirectToSelectedSource())
        },
    })
    const deleteCategory = useAsyncCallback(client.category.delete, {
        onSuccess: () => {
            dispatch(reloadTree())
            dispatch(redirectToRootCategory())
        },
    })

    const openDeleteCategoryModal = () => {
        const categoryName = category?.name
        return openConfirmModal({
            title: t`Delete Category`,
            children: (
                <Text size="sm">
                    <Trans>
                        Are you sure you want to delete category <Code>{categoryName}</Code>?
                    </Trans>
                </Text>
            ),
            labels: { confirm: t`Confirm`, cancel: t`Cancel` },
            confirmProps: { color: "red" },
            onConfirm: () => deleteCategory.execute({ id: +id }),
        })
    }

    useEffect(() => {
        if (!category) return
        setValues({
            id: +category.id,
            name: category.name,
            parentId: category.parentId,
            position: category.position,
        })
    }, [setValues, category])

    const editable = id !== Constants.categoryIds.all
    if (!category) return <Loader />
    return (
        <Container>
            {modifyCategory.error && (
                <Box mb="md">
                    <Alert messages={errorToStrings(modifyCategory.error)} />
                </Box>
            )}

            {deleteCategory.error && (
                <Box mb="md">
                    <Alert messages={errorToStrings(deleteCategory.error)} />
                </Box>
            )}

            <form onSubmit={form.onSubmit(modifyCategory.execute)}>
                <Stack>
                    <Title order={3}>{category.name}</Title>
                    <Input.Wrapper label={t`Generated feed url`}>
                        <Box>
                            {apiKey && (
                                <Anchor
                                    href={`rest/category/entriesAsFeed?id=${category.id}&apiKey=${apiKey}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Trans>Link</Trans>
                                </Anchor>
                            )}
                            {!apiKey && <Trans>Generate an API key in your profile first.</Trans>}
                        </Box>
                    </Input.Wrapper>

                    {editable && (
                        <>
                            <TextInput label={t`Name`} {...form.getInputProps("name")} required />
                            <CategorySelect label={t`Parent Category`} {...form.getInputProps("parentId")} clearable />
                            <NumberInput label={t`Position`} {...form.getInputProps("position")} required min={0} />
                        </>
                    )}

                    <Group>
                        <Button variant="default" onClick={() => dispatch(redirectToSelectedSource())}>
                            <Trans>Cancel</Trans>
                        </Button>
                        {editable && (
                            <>
                                <Button type="submit" leftIcon={<TbDeviceFloppy size={16} />} loading={modifyCategory.loading}>
                                    <Trans>Save</Trans>
                                </Button>
                                <Divider orientation="vertical" />
                                <Button
                                    color="red"
                                    leftIcon={<TbTrash size={16} />}
                                    onClick={() => openDeleteCategoryModal()}
                                    loading={deleteCategory.loading}
                                >
                                    <Trans>Delete</Trans>
                                </Button>
                            </>
                        )}
                    </Group>
                </Stack>
            </form>
        </Container>
    )
}