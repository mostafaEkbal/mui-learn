import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Image from 'next/image';

interface Prediction {
    category: string;
    severity: number;
}

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [results, setResults] = useState<Prediction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInappropriate, setIsInappropriate] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setResults([]);
        setIsInappropriate(false);
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
                    'Ocp-Apim-Subscription-Key':
                        process.env.NEXT_PUBLIC_AZURE_API_KEY,
                    'Content-Type': 'application/json'
                },
                data: {
                    image: {
                        content: base64Content
                    },
                    categories: ['Hate', 'SelfHarm', 'Sexual', 'Violence'],
                    outputType: 'FourSeverityLevels'
                }
            };

            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_AZURE_ENDPOINT}/contentsafety/image:analyze?api-version=2023-10-01`,
                    requestOptions.data,
                    { headers: requestOptions.headers }
                );
                const predictions = response.data.categoriesAnalysis;
                console.log(response.data);
                setResults(predictions);
                isPotentiallyInappropriate(predictions);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        reader.readAsDataURL(imageFile);
    };

    const isPotentiallyInappropriate = (predictions: Prediction[]) => {
        const severityThreshold = 2; // Customize this threshold based on your needs
        if (predictions.some((pred) => pred.severity >= severityThreshold)) {
            return setIsInappropriate(true);
        }
        return setIsInappropriate(false);
    };

    return (
        <div
            className='App'
            style={{
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}
        >
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
                    style={!isInappropriate ? imageStyles : imageBlurStyles}
                    width={300}
                    height={200}
                />
            )}
            <button
                onClick={classifyImage}
                style={{ alignSelf: 'start' }}
                disabled={!imageFile || isLoading}
            >
                {isLoading ? 'Processing...' : 'Check Image Content'}
            </button>
            {results.length > 0 && (
                <div>
                    <h2>Results:</h2>
                    <ul>
                        {results.map((result, index) => (
                            <li key={result.category}>
                                {result.category} - Severity: {result.severity}
                            </li>
                        ))}
                    </ul>
                    {isInappropriate ? (
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

const imageBlurStyles: React.CSSProperties = {
    ...imageStyles,
    filter: 'blur(20px)'
};

export default App;
