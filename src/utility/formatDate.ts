export default function formatDate(dateString: string) {
    const dateObj = new Date(dateString)

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    return dateObj.toLocaleDateString("en-US", options)
}
