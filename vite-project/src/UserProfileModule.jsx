import axios from "axios";

export async function getSetUserResults(userId, setUserResults) {
    const out = await axios.get(`http://localhost:8080/result/${userId}`);
    setUserResults(out.data[0]);
};
