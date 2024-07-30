import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Image from 'next/image';

interface AnalysisResult {
    adult: {
        isAdultContent: boolean;
        isRacyContent: boolean;
        isGoryContent: boolean;
        adultScore: number;
        racyScore: number;
        goreScore: number;
    };
    categories: Array<{ name: string; score: number }>;
    color: {
        dominantColorForeground: string;
        dominantColorBackground: string;
        dominantColors: string[];
        accentColor: string;
    };
    description: {
        tags: string[];
        captions: Array<{ text: string; confidence: number }>;
    };
    faces: Array<{
        age: number;
        gender: string;
        faceRectangle: {
            left: number;
            top: number;
            width: number;
            height: number;
        };
    }>;
    objects: Array<{
        object: string;
        confidence: number;
        rectangle: { x: number; y: number; w: number; h: number };
    }>;
    tags: Array<{ name: string; confidence: number }>;
}

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [results, setResults] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setError(null);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const uploadToImgur = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(
            'https://api.imgur.com/3/image',
            formData,
            {
                headers: {
                    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`
                }
            }
        );

        return response.data.data.link;
    };

    const analyzeImage = async () => {
        if (!imageFile) return;

        setIsLoading(true);
        setError(null);

        try {
            const imageUrl =
                'https://www.indiaspend.com/h-upload/2021/07/21/516856-prescription-drugs-controlled-chemicals-are-fuelling-indias-illicit-drug-trade-reports.jpg';

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_AZURE_ENDPOINT}/vision/v3.1/analyze`,
                { url: imageUrl },
                {
                    params: {
                        visualFeatures:
                            'Adult,Categories,Color,Description,Faces,Objects,Tags',
                        language: 'en'
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Subscription-Key':
                            process.env.NEXT_PUBLIC_AZURE_API_KEY
                    }
                }
            );

            setResults(response.data);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while analyzing the image.');
            if (axios.isAxiosError(error)) {
                console.error('Response data:', error.response?.data);
                console.error('Response status:', error.response?.status);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='App'>
            <h1>Image Analysis</h1>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p>
                    Drag &#39;n&#39; drop an image here, or click to select one
                </p>
            </div>
            {imagePreview && (
                <Image
                    src={imagePreview}
                    alt='Uploaded'
                    style={imageStyles}
                    width={300}
                    height={200}
                />
            )}
            <button onClick={analyzeImage} disabled={!imageFile || isLoading}>
                {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results && (
                <div>
                    <h2>Analysis Results:</h2>
                    <h3>Adult Content:</h3>
                    <ul>
                        <li>
                            Is Adult Content:{' '}
                            {results.adult.isAdultContent ? 'Yes' : 'No'}
                        </li>
                        <li>
                            Is Racy Content:{' '}
                            {results.adult.isRacyContent ? 'Yes' : 'No'}
                        </li>
                        <li>
                            Is Gory Content:{' '}
                            {results.adult.isGoryContent ? 'Yes' : 'No'}
                        </li>
                        <li>
                            Adult Score:{' '}
                            {(results.adult.adultScore * 100).toFixed(2)}%
                        </li>
                        <li>
                            Racy Score:{' '}
                            {(results.adult.racyScore * 100).toFixed(2)}%
                        </li>
                        <li>
                            Gore Score:{' '}
                            {(results.adult.goreScore * 100).toFixed(2)}%
                        </li>
                    </ul>
                    <h3>Categories:</h3>
                    <ul>
                        {results.categories.map((category, index) => (
                            <li key={category.name}>
                                {category.name} -{' '}
                                {(category.score * 100).toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                    <h3>Dominant Colors:</h3>
                    <ul>
                        <li>
                            Foreground: {results.color.dominantColorForeground}
                        </li>
                        <li>
                            Background: {results.color.dominantColorBackground}
                        </li>
                        <li>Accent: {results.color.accentColor}</li>
                    </ul>
                    <h3>Description:</h3>
                    <p>
                        {results.description.captions[0]?.text} (Confidence:{' '}
                        {(
                            results.description.captions[0]?.confidence * 100
                        ).toFixed(2)}
                        %)
                    </p>
                    <h3>Tags:</h3>
                    <ul>
                        {results.tags.map((tag, index) => (
                            <li key={tag.name}>
                                {tag.name} - {(tag.confidence * 100).toFixed(2)}
                                %
                            </li>
                        ))}
                    </ul>
                    <h3>Objects Detected:</h3>
                    <ul>
                        {results.objects.map((obj, index) => (
                            <li key={obj.object}>
                                {obj.object} -{' '}
                                {(obj.confidence * 100).toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                    <h3>Faces Detected:</h3>
                    <ul>
                        {results.faces.map((face, index) => (
                            <li key={face.age}>
                                Age: {face.age}, Gender: {face.gender}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const dropzoneStyles: React.CSSProperties = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer'
};

const imageStyles: React.CSSProperties = {
    maxWidth: '300px',
    maxHeight: '300px',
    margin: '20px 0'
};

export default App;
