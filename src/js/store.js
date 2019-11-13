import { Share } from './components/lib/sole'
export const buffer = new Share;


export class Store {
    constructor() {
        this.state = {
            txt: [],
            prompt: '',
            cursor: 0,
            input: ""
        }
        this.sync = this.sync.bind(this);
        this.print = this.print.bind(this);
    }

    handleEvent(data) {
        // recursive handler
        if (data.data) {
            var dojoReply = data.data;
        } else {
            var dojoReply = data;
        }
        // %mor sole-effects are nested, so throw back to handler
        if (dojoReply.map) { 
            return dojoReply.map(reply => this.handleEvent(reply));
        }
        // throw 'set' to apply(ted) in buffer
        switch(Object.keys(dojoReply)[0]) {
            case 'txt':
                return this.print(dojoReply.txt);
            case 'tan':
                return dojoReply.tan.split("\n").map(this.print);
            case 'pro':
                return this.setState({ prompt: dojoReply.pro.cad });
            case 'hop':
                return this.setState({ cursor: dojoReply.hop });
            case 'det':
                buffer.receive(dojoReply.det);
                return this.sync(dojoReply.det.ted);
            case 'act':
                switch(dojoReply.act) {
                    case 'clr': return this.setState({txt: []});
                    case 'nex': return this.setState({
                        input: "",
                        cursor: 0
                    });
                } break;
            default: console.log(dojoReply);
        }
    }

    print(txt) {
        let textLog = this.state.txt;
        textLog.push(txt);
        return this.setState({ txt: textLog });
    }
    
    sync(ted) {
        return this.setState({ input: buffer.buf, cursor: buffer.transpose(ted, this.state.cursor)});
    }

    setStateHandler(setState) {
        this.setState = setState;
    }
}

export let store = new Store();
window.store = store;