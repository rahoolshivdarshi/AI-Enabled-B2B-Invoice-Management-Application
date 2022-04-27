import axios from "axios"

const GetData = async () => {
    let response = await axios.get("http://localhost:8081/HighRadius/Fetch")
    return response.data;
}

export default GetData




