// Profile info & cat fact api
// Add timeout to the api call
const fetchWithTimeout = async(url, options = {})=>{
  const {timeout = 8000} = options
  const controller = new AbortController()
  // set the timer
  const timer = setTimeout(() => {
    controller.abort()
  }, timeout);
  const response = await fetch(url,{...options,signal: controller.signal})
  // clear the timeout if it runs well
  clearTimeout(timer)
  return response;
}
const profile = async (req,res) => {
  const {email,name,stack} = req.query
  const date = new Date().toISOString()
  const baseUrl = 'https://catfact.ninja'
  const profileResponse = {
    "status": "success",
    "user": {
      "email": email,
      "name": name,
      "stack": stack
    },
    "timestamp": date,
    "fact": "Sorry,the API down,but here is one fact about cats: 'In 1987 cats overtook dogs as the number one pet in America.'"
  }
  try {
    // create a set to store the cat facts that are already gotten
    const catFactSet = new Set()
    // fetch random cat fact
    let fact;
    do{
      const response = await fetchWithTimeout(`${baseUrl}/fact?max_length=100`,{
        timeout: 6000,
        method: "GET",
        headers: { 'Content-Type': 'application/json'}
      })
          if(!response.ok){
            return res.status(502).json({
              error:`Request failed, status: ${response.status}`,
              profile: profileResponse
            })
          }
          const data = await response.json()
          fact = data.fact
    }
    // if catFactSet.has(fact) is true, continue fetching for a new cat fact. When it's false, add the cat fact to the set and return the json response
    while (catFactSet.has(fact));
    // Add the new fact to the set and return response
    catFactSet.add(fact)
    return res.status(200).json({
      ...profileResponse,
      fact: fact
    })
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({message: `${error}`})
    }else{
      return res.status(500).json({message: `${error.message}`})
    }
  }
}

export default profile
