import { Share } from './components/lib/sole'
export const buffer = new Share;


export class Store {
    constructor() {
        this.state = {
            txt: [],
            prompt: '',
            cursor: 0
        }
    }

    handleEvent(data) {
        // this needs a map but also why does dojo say nothing when sending it a sole-action
        let dojoReply = data.data;
        console.log(dojoReply);
        // pro is our prompt, either '>' or '<' depending on the statement
        if (dojoReply.pro) this.setState({ prompt: dojoReply.pro.cad});
        if (dojoReply.tan) {
            let textLog = this.state.txt;
            textLog.push(dojoReply.tan);
            this.setState({ txt: textLog });
        }
        // responses come in "reply + change to buffer" arrays
        if (dojoReply.constructor === Array) {
            // txt prints to console history
            if (dojoReply[0].txt) {
                let textLog = this.state.txt;
                textLog.push(dojoReply[0].txt);
                this.setState({ txt: textLog });
            }
            else if (dojoReply[0].det) {
                buffer.receive(dojoReply[0].det);
            }
        }
    }

    setStateHandler(setState) {
        this.setState = setState;
    }
}

export let store = new Store();
window.store = store;