import HTTP from "../../http-common";
import moment from "moment/moment";

function formatRecord(record) {
    record.admission_date = moment(record.admission_date).format(
        "YYYY-MM-DD HH:mm:ss"
    );
    if (record.vital_signs) {
        record.vital_signs.age = moment().diff(record.vital_signs.age, "years");
    }
    return record;
}

//TODO: impement infinite scroll with pagination

export default {
    namespaced: true,
    state: {
        record: null,
        persisted: false,
        probability: null,
        pagination: null,
        probabilities: {}
    },
    computed: {},
    mutations: {
        SET_RECORD(state, record) {
            state.record = record;
            state.persisted = true;
        },
        SET_PAGINATED_RECORDS(state, paginatedRecords) {
            state.pagination = paginatedRecords;
        },
        SET_PROBABILITY(state, probability) {
            state.probability = probability;
            if (state.record) {
                state.probabilities[state.record.uuid] = probability;
            }
        },
        UPDATE_RECORD(state, payload) {
            state.record = {...state.record, ...payload};
            state.persisted = true;
        },
        CLEAR_RECORD(state) {
            state.record = null;
            state.persisted = false;
        },
    },
    actions: {
        setRecord({commit}, record) {
            commit("SET_RECORD", formatRecord(record));
        },
        setProbability({commit}, probability) {
            commit("SET_PROBABILITY", probability);
        },
        clearRecord({commit}) {
            commit("CLEAR_RECORD");
        },
        updateRecord({commit}, record) {
            commit("UPDATE_RECORD", record);
        },
        fetchRecord({commit}, uuid) {
            HTTP.get(`records/${uuid}`)
                .then((res) => {
                    commit("SET_RECORD", formatRecord(res.data));
                })
                .catch((error) => console.error(error));
        },
        loadRecords({commit}, page) {
            HTTP.get("records", {
                params: {
                    page
                }
            })
                .then((res) => {
                    res.data.items = res.data.items.map(record => formatRecord(record));
                    commit("SET_PAGINATED_RECORDS", res.data);
                })
                .catch((error) => console.error(error));
        },
        searchRecords({commit}, search) {
            HTTP.post("records/search", {q: search})
                .then((res) => {
                    res.data.items = res.data.items.map(record => formatRecord(record));
                    commit("SET_PAGINATED_RECORDS", res.data);
                })
                .catch((error) => console.error(error));
        }
    },
};
