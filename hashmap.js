import { Node } from "./node.js";

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;

        for (let i = 0; i < key.length; i++) {
            hashCode = 31 * hashCode + key.charCodeAt(i);// 31 is primeNumber for unique hashcode
        }

        return hashCode;
    }
    set(key, value) {
        const index = this.hash(key);

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let current = this.buckets[index];

        if (!current) {
            this.buckets[index] = new Node(key, value);
            this.size++;
        }

        while (current) {
            if (current.key === key) {
                current.value = value;
                return;
            }
            if (!current.next) break;
            current = current.next;
        }

        current.next = new Node(key, value);
        this.size++;

    }

    get(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let current = this.buckets[index];

        while(current){
            if(current.key === key) return current.value;
        }

        return undefined;
    }
}

export { HashMap };