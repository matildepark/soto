import { Share } from './components/lib/sole'
export const buffer = new Share;


export class Store {
    constructor() {
        this.state = {
            txt: [],
            prompt: ''
        }
        console.log(buffer);
    }

    handleEvent(data) {
        let dojoReply = data.data;
        console.log(dojoReply);
        // pro is our prompt, either > or < depending on the statement
        if (dojoReply.pro) this.setState({ prompt: dojoReply.pro.cad});
        // responses come in "reply + change to buffer" arrays
        if (dojoReply.constructor === Array) {
            if (dojoReply[0].txt) {
                let textLog = this.state.txt;
                textLog.push(dojoReply[0].txt);
                this.setState({ txt: textLog });
            }
        }
    }

    setStateHandler(setState) {
        this.setState = setState;
    }
}

export let store = new Store();
window.store = store;