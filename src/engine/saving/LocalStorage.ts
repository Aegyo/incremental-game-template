export class LocalStorage {
    public static store(key: string, data: Record<string, unknown>): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // TODO(@Isha) add error handling here
    public static get(key: string): Record<string, unknown> {
        return JSON.parse(localStorage.getItem(key)) as Record<string, unknown>;
    }

}
