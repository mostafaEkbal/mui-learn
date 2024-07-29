import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface Prediction {
    name: string;
    value: number;
}

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [results, setResults] = useState<Prediction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const classifyImage = async () => {
        if (!imageFile) return;

        setIsLoading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Data = e.target?.result as string;
            const base64Content = base64Data.split(',')[1];

            const raw = JSON.stringify({
                user_app_id: {
                    user_id: 'sabz7h3pu79q',
                    app_id: 'image-monitoring'
                },
                inputs: [
                    {
                        data: {
                            image: {
                                base64: base64Content
                            }
                        }
                    }
                ]
            });

            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Key ' + process.env.NEXT_PUBLIC_API_KEY
                },
                data: raw
            };

            try {
                const response = await axios.post(
                    'https://api.clarifai.com/v2/models/moderation-recognition/versions/aa8be956dbaa4b7a858826a84253cab9/outputs',
                    raw,
                    requestOptions
                );
                const predictions = response.data.outputs[0].data.concepts;
                setResults(predictions);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        reader.readAsDataURL(imageFile);
    };

    const isPotentiallyInappropriate = (predictions: Prediction[]) => {
        const inappropriateThreshold = 0.5;
        let safeValue: number = 0;
        predictions.forEach((pred) => {
            if (pred.name === 'safe') safeValue = pred.value;
        });
        console.log(safeValue);
        return safeValue < inappropriateThreshold;
    };

    return (
        <div className='App'>
            <h1>Image Content Moderation</h1>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select one</p>
            </div>
            {imagePreview && (
                <img src={imagePreview} alt='Uploaded' style={imageStyles} />
            )}
            <button onClick={classifyImage} disabled={!imageFile || isLoading}>
                {isLoading ? 'Processing...' : 'Check Image Content'}
            </button>
            {results.length > 0 && (
                <div>
                    <h2>Results:</h2>
                    <ul>
                        {results.map((result) => (
                            <li key={result.name}>
                                {result.name} -{' '}
                                {(result.value * 100).toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                    {isPotentiallyInappropriate(results) ? (
                        <p style={{ color: 'red' }}>
                            Warning: This image may contain inappropriate
                            content.
                        </p>
                    ) : (
                        <p style={{ color: 'green' }}>
                            This image appears to be appropriate.
                        </p>
                    )}
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
