import React, { useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { useDropzone } from 'react-dropzone';

interface Prediction {
    className: string;
    probability: number;
}

const App: React.FC = () => {
    const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [results, setResults] = useState<Prediction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadModel = async () => {
            setIsLoading(true);
            const loadedModel = await mobilenet.load();
            setModel(loadedModel);
            setIsLoading(false);
        };
        loadModel();
    }, []);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImageUrl(URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const classifyImage = async () => {
        if (!model || !imageUrl) return;

        setIsLoading(true);
        const img = new Image();
        img.src = imageUrl;
        img.onload = async () => {
            const tfImg = tf.browser.fromPixels(img);
            const predictions = await model.classify(tfImg);
            console.log(predictions);
            setResults(predictions);
            setIsLoading(false);
        };
    };

    const isPotentiallyInappropriate = (predictions: Prediction[]) => {
        const inappropriateCategories = [
            'Nudity',
            'Sexual content',
            'Pornography',
            'Violence',
            'Gore',
            'Weapons',
            'Drugs',
            'Alcohol',
            'Tobacco',
            'Hate symbols',
            'Extremist content',
            'Self-harm',
            'Animal cruelty',
            'Child exploitation',
            'Offensive gestures',
            'Profanity (in text within images)',
            'Gambling',
            'Graphic medical procedures',
            'Dangerous stunts',
            'Harassment or bullying content',
            'Personal information (e.g., ID cards, credit cards)',
            'Copyrighted or trademarked content',
            'Counterfeit goods',
            'Explicit or suggestive clothing',
            'Controversial political symbols',
            'Religious blasphemy',
            'Conspiracy theory propaganda',
            'Misinformation or fake news imagery',
            'Illegal activities',
            'Explosives or hazardous materials'
        ];
        return predictions.some((pred) =>
            inappropriateCategories.some((category) =>
                pred.className.toLowerCase().includes(category)
            )
        );
    };

    return (
        <div className='App'>
            <h1>Image Content Moderation</h1>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select one</p>
            </div>
            {imageUrl && (
                <img src={imageUrl} alt='Uploaded' style={imageStyles} />
            )}
            <button onClick={classifyImage} disabled={!imageUrl || isLoading}>
                {isLoading ? 'Processing...' : 'Check Image Content'}
            </button>
            {results.length > 0 && (
                <div>
                    <h2>Results:</h2>
                    <ul>
                        {results.map((result) => (
                            <li key={result.className}>
                                {result.className} -{' '}
                                {(result.probability * 100).toFixed(2)}%
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
