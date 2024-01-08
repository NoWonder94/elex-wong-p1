export class UnOrderMultiMap<T, K> {
    private readonly dictionary: Map<T, K[]> = new Map<T, K[]>();

    // 重用list
    private readonly queue: K[][] = new Array<K[]>();

    public getDictionary(): Map<T, K[]> {
        return this.dictionary;
    }

    public add(t: T, k: K): void {
        let list: K[] = this.dictionary.get(t);
        if (list == null) {
            list = this.fetchList();
            this.dictionary.set(t, list);
        }
        list.push(k);
    }

    public first(): IterableIterator<[T, K[]]> {
        return this.dictionary.entries();
    }

    public get count() {
        return this.dictionary.size;
    }

    private fetchList(): K[] {
        if (this.queue.length > 0) {
            const list = this.queue.shift();
            list.splice(0, list.length);
            return list;
        }
        return new Array<K>();
    }

    private recycleList(list: K[]): void {
        // 防止暴涨
        if (this.queue.length > 100) {
            return;
        }
        list.splice(0, list.length);
        this.queue.push(list);
    }

    public remove(t: T): boolean;
    public remove(t: T, k?: K): boolean {
        const list: K[] = this.dictionary.get(t);
        if (list == null) {
            return false;
        }

        const index = list.indexOf(k);
        if (-1 === index) {
            return false;
        }
        list.splice(index, 1);
        if (list.length === 0 || !!k) {
            this.recycleList(list);
            this.dictionary.delete(t);
        }
        return true;
    }

    public getAll(t: T): K[] {
        const list: K[] = this.dictionary.get(t);
        if (list == null) {
            return new Array<K>();
        }
        return [...list];
    }

    public getList(t: T) {
        const list: K[] = this.dictionary.get(t);
        if (list == null) {
            return;
        }
        return list;
    }

    public getOne(t: T): K {
        const list: K[] = this.dictionary.get(t);
        if (list != null && list.length > 0) {
            return list[0];
        }
    }

    public contains(t: T, k: K): boolean {
        const list: K[] = this.dictionary.get(t);
        if (list == null) {
            return false;
        }
        return -1 !== list.indexOf(k);
    }

    public containsKey(t: T): boolean {
        return this.dictionary.has(t);
    }

    public clear(): void {
        for (const v of this.dictionary.values()) {
            this.recycleList(v);
        }
        this.dictionary.clear();
    }
}