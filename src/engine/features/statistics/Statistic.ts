export abstract class Statistic {
    key: string;
    abstract value: any;

    protected constructor(key: string) {
        this.key = key;
    }

}
