import _ from 'lodash';

// set state for buffer

export class InitialReducer {
    reduce(json, state) {
        let data = _.get(json, 'initial', false);
        if (data) {
            state.messages = data.messages;
        }
    }
}
