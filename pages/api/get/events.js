export default async function handler(req, res) {

    // GET CURRENT DATE
    var startDate = new Date();
    var start_date = startDate.toISOString().split('T')[0];

    // GET 30 DAYS FROM TODAY
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);
    var end_date = endDate.toISOString().split('T')[0];

    var latitude = "29.758060";
    var longitude = "-95.362970";

    var authToken = process.env.NEXT_PUBLIC_OG_API_KEY;
    var url = "https://v2.api.occasiongenius.com/api/events/?start_date=" + start_date + "&end_date=" + end_date + "&limit=250&latitude=" + latitude + "&longitude=" + longitude +  "&distance=20&limit=25";
    
    // FETCH FROM REMOTE API
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + authToken
        }
    })
    .then(response => response.json())
    .then(data => {
        const sortedData = data.results.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        res.setHeader('Cache-Control', 's-maxage=43200, stale-while-revalidate');
        res.status(200).json(sortedData);
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    });
}