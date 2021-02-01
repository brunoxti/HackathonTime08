export class StringUtils {
    public static except(string: string, limit = 10) {
        if (string.length <= limit)
            return string;

        return string.substring(0, limit) + "...";
    }
}