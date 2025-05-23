import { IWeather, WeatherModel } from './models/weather';
import { dbConnect } from './db/connect.js';
import { streamSSE } from 'hono/streaming';
import { serve } from '@hono/node-server';
import * as dotenv from 'dotenv';
import { Hono } from 'hono';

dotenv.config();

export const app = new Hono().basePath('/api');
dbConnect()
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        app.get('/*', (c) => {
            return c.json({
                message: 'Error connecting to database',
            }, 500);
        })
    });

let weatherCache: IWeather | null = null;

app.post('/weather', async (c) => {
    const formData = await c.req.json();

    if (!formData) return c.body(null, 400);

    const weatherObj = new WeatherModel(formData);

    try {
        const weatherInfos = await weatherObj.save()
        console.log('Weather data saved:', weatherInfos);
        return c.body(null, 201);
    } catch (err) {
        console.error('Error saving weather data:', err);
        return c.body(null, 500);
    }
});

// app.get('/weather', async (c) => {
//     const query = c.req.query('q');

//     const result = await WeatherModel
//         .find({
//             location: query,
//         })
//         .limit(10);
// });

app.get('/sse/weather', async (c) => {
    return streamSSE(c, async (stream) => {
        await stream.writeSSE({
            data: weatherCache ? JSON.stringify(weatherCache) : '',
            event: 'time-update',
        })
    })
});

serve({
    fetch: app.fetch,
    port: 3001
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})
