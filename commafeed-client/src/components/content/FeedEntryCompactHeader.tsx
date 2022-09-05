import { Box, createStyles, Image, Text } from "@mantine/core"
import { Entry } from "app/types"
import { RelativeDate } from "components/RelativeDate"
import { OnDesktop } from "components/responsive/OnDesktop"

export interface FeedEntryHeaderProps {
    entry: Entry
}

const useStyles = createStyles((theme, props: FeedEntryHeaderProps) => ({
    wrapper: {
        display: "flex",
        alignItems: "center",
        columnGap: "10px",
    },
    title: {
        flexGrow: 1,
        fontWeight: theme.colorScheme === "light" && !props.entry.read ? "bold" : "inherit",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    feedName: {
        width: "145px",
        minWidth: "145px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    date: {
        whiteSpace: "nowrap",
    },
}))
export function FeedEntryCompactHeader(props: FeedEntryHeaderProps) {
    const { classes } = useStyles(props)
    return (
        <Box className={classes.wrapper}>
            <Box>
                <Image withPlaceholder src={props.entry.iconUrl} alt="feed icon" width={18} height={18} />
            </Box>
            <OnDesktop>
                <Text color="dimmed" className={classes.feedName}>
                    {props.entry.feedName}
                </Text>
            </OnDesktop>
            <Box className={classes.title}>{props.entry.title}</Box>
            <OnDesktop>
                <Box className={classes.date}>
                    <Text color="dimmed">
                        <RelativeDate date={props.entry.date} />
                    </Text>
                </Box>
            </OnDesktop>
        </Box>
    )
}
