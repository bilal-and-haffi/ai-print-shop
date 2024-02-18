export async function GET() {
  try {
    const res = await fetch('https://api.printify.com/v1/shops.json', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PRINTIFY_API_TOKEN}`
      },
    })
    const data = await res.json()
    console.log({ data})
    return Response.json({ data })
  }  catch (error) {
      console.error({ error })
  }
}