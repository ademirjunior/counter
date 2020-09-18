import Axios from "axios";

class TodoDataSertvice {

    retrieveAllTodos(name) {
        return Axios.get(`http://localhost:8080/users/${name}/todos`);
    }
}

export default new TodoDataSertvice();