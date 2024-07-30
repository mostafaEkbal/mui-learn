import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Image from 'next/image';

interface Prediction {
    name: string;
    confidence: number;
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

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Ocp-Apim-Subscription-Key':
                        process.env.NEXT_PUBLIC_AZURE_API_KEY ?? ''
                },
                data: Buffer.from(base64Content, 'base64')
            };

            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_AZURE_ENDPOINT}/vision/v3.1/analyze?visualFeatures=Adult`,
                    requestOptions.data,
                    requestOptions
                );

                const adultContent = response.data.adult;
                console.log(adultContent);
                const predictions: Prediction[] = [
                    {
                        name: 'Adult Content',
                        confidence: adultContent.adultScore
                    },
                    {
                        name: 'Racy Content',
                        confidence: adultContent.racyScore
                    },
                    { name: 'Gory Content', confidence: adultContent.goreScore }
                ];
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
        return predictions.some(
            (pred) => pred.confidence > inappropriateThreshold
        );
    };

    return (
        <div className='App'>
            <h1>Image Content Moderation</h1>
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
                                {(result.confidence * 100).toFixed(2)}%
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
