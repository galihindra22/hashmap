import { Node } from "./node.js";

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0;
        this.buckets = new Array(capacity).fill(null);
    }

    hash(key) {
        let hashCode = 0;

        for (let i = 0; i < key.length; i++) {
            hashCode = (31 * hashCode + key.charCodeAt(i)) % this.capacity;// 31 is primeNumber for unique hashcode
        }

        return hashCode;
    }
    set(key, value) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let current = this.buckets[index];

        if (!current) {
            this.buckets[index] = new Node(key, value);
            this.size++;
            return;
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

        if(this.size > this.capacity * this.loadFactor) this.resize();
    }

    get(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let current = this.buckets[index];

        while (current) {
            if (current.key === key) return current.value;
            current = current.next;
        }

        return undefined;
    }
    has(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let current = this.buckets[index];

        while (current) {
            if (current.key === key) return true;
            current = current.next;
        }

        return false;
    }
    remove(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let current = this.buckets[index];
        let previous = null;

        while (current) {
            if (current.key === key) {
                if (previous === null) {
                    this.buckets[index] = current.next;
                }
                else {
                    previous.next = current.next;
                }
                this.size--;
                return true;
            }
            previous = current;
            current = current.next;

        }
        return false;
    }
    length() {
        return this.size;
    }
    clear() {
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }
    keys() {
        let result = [];

        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];

            while (current) {
                result.push(current.key);
                current = current.next;
            }
        }
        return result;
    }
    values() {
        let result = [];

        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];

            while (current) {
                result.push(current.value);
                current = current.next;
            }
        }
        return result;
    }
    entries() {
        let result = [];

        for (let i = 0; i < this.buckets.length; i++) {
            let current = this.buckets[i];

            while (current) {
                result.push([current.key, current.value]);
                current = current.next;
            }
        }
        return result;
    }
    resize(){
        const oldBuckets = this.buckets;

        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;

        for(let i=0; i<oldBuckets.length; i++){
            let current = oldBuckets[i];

            while(current){
                this.set(current.key, current.value);
                current = current.next;
            }
        }
    }
}
export { HashMap };