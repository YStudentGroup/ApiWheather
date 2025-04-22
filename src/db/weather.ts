import { model, Schema } from 'mongoose';

export interface IWeather {
    temperature: number;
    felt?: number;
    condition?: string;
    season?: string;
    wind: number;
    humidity: number;
    location: string;
    date: string;
}

export const WeatherSchema = new Schema<IWeather>({
    temperature: {
        type: Number,
        required: true,
    },
    felt: {
        type: Number,
        required: false,
    },
    condition: {
        type: String,
        required: false,
    },
    season: {
        type: String,
        required: false,
    },
    wind: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: new Date().toISOString(),
        required: true,
    },
})

export const WeatherModel = model('weather', WeatherSchema);