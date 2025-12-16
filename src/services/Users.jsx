
export async function checkIdExists(id) {
  const res = await fetch(
    `http://localhost:4000/api/participants/check/${encodeURIComponent(id)}`
  );
  console.log("Fetching participants...");
 console.log(res)
//   return handleResponse(res);
try{
   if (!res.ok) {
      throw new Error("Failed to fetch votes");
    }
    const data = await res.json(); // parse JSON
    return data;
  } catch (error) {
    console.error(error);
    return [];}

}

/**
 * Create a new participant
 * POST /api/participants
 * Body: { id, name, email }
 */
export async function createParticipant({ id, name, email }) {
  const res = await fetch(`http://localhost:4000/api/participants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, email }),
  });
  console.log("Fetching participants...");
 console.log(res)
//   return handleResponse(res);
try{
   if (!res.ok) {
      throw new Error("Failed to fetch votes");
    }
    const data = await res.json(); // parse JSON
    return data;
  } catch (error) {
    console.error(error);
    return [];}

}
/**
 * Get all participants
 * GET /api/participants
 */
export async function getParticipants() {
  const res = await fetch(`http://localhost:4000/api/participants`);
  console.log("Fetching participants...");
 console.log(res)
//   return handleResponse(res);
try{
   if (!res.ok) {
      throw new Error("Failed to fetch votes");
    }
    const data = await res.json(); // parse JSON
    return data;
  } catch (error) {
    console.error(error);
    return [];}

}

/**
 * Save a winner
 * POST /api/winners
 * Body: { id, name, email }
 */
export async function saveWinner({ id, name, email }) {
  const res = await fetch(`http://localhost:4000/api/winners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, email }),
  });
  console.log("Fetching participants...");
 console.log(res)
//   return handleResponse(res);
try{
   if (!res.ok) {
      throw new Error("Failed to fetch votes");
    }
    const data = await res.json(); // parse JSON
    return data;
  } catch (error) {
    console.error(error);
    return [];}

}
/**
 * Get all winners
 * GET /api/winners
 */
export async function getWinners() {
  const res = await fetch(`http://localhost:4000/api/winners`);
  console.log("Fetching participants...");
 console.log(res)
//   return handleResponse(res);
try{
   if (!res.ok) {
      throw new Error("Failed to fetch votes");
    }
    const data = await res.json(); // parse JSON
    return data;
  } catch (error) {
    console.error(error);
    return [];}

}