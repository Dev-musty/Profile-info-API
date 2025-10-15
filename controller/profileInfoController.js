// Profile info & cat fact api

const profile = async (req,res) => {
  const {email,name,stack} = req.body
  const date = new Date().toISOString()
  const baseUrl = 'https://catfact.ninja'
  try {
    // create a set to store the cat facts that are already gotten
    const catFactSet = new Set()
    // fetch random cat fact
    let data;
    do{
      const response = await fetch(`${baseUrl}/fact?max_length=100`,{method: "GET"})
          if(!response){
            throw new Error(`Request failed, status: ${response.status}`);
          }
          data = await response.json()
    }
    // if catFactSet.has(data.fact) is true, continue fetching for a new cat fact. When it's false, add the cat fact to the set and return the json response
    while (catFactSet.has(data.fact)) {
      catFactSet.add(data.fact)
      return res.status(200).json({
        "status": "success",
        "user": {
          "email": email,
          "name": name,
          "stack": stack
        },
        "timestamp": date,
        "fact": data.fact
      })
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message: 'error fetching cat fact'})
  }
}

export default profile
