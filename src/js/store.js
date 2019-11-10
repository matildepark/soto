export class Store {
    constructor() {
        this.state = {
            txt: [],
            prompt: ''
        }
    }

    handleEvent(data) {
        let json = data.data;
        console.log(json);
        if (json.pro) this.setState({prompt: json.pro.cad})
        let textLog = this.state;
    }

    setStateHandler(setState) {
        this.setState = setState;
    }
}

export let store = new Store();
window.store = store;