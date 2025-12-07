const fs = require('fs').promises;
const path = require('path');

class JsonStore {
    constructor(filename, defaultData) {
        this.filepath = path.join(__dirname, '../data', filename);
        this.defaultData = defaultData;
        this.data = null;
    }

    async init() {
        try {
            await fs.access(this.filepath);
            const content = await fs.readFile(this.filepath, 'utf8');
            this.data = JSON.parse(content);
        } catch (error) {
            // If file doesn't exist, create it with default data
            this.data = this.defaultData;
            await this.save();
        }
        return this.data;
    }

    async read() {
        if (!this.data) {
            await this.init();
        }
        return this.data;
    }

    async write(newData) {
        this.data = newData;
        await this.save();
        return this.data;
    }

    async save() {
        await fs.writeFile(this.filepath, JSON.stringify(this.data, null, 2));
    }
}

module.exports = JsonStore;
