import React from "react";
import { useAsync } from "react-async";

const asyncCall = async ({ signal }) => {
    const res = await fetch("https://aws.random.cat/meow");
    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json();
};

const App = props => {
    const result = useAsync({
        promiseFn: asyncCall
    });

    return (
        <div className="Cat gen" style={{ textAlign: "center" }}>
            <h1>CAT GENERATOR V1</h1>
            <div>
                <button onClick={result.run()}>Generate another cat</button>
                {result.isPending ? (
                    <span>generating cat...</span>
                ) : (
                    <div>
                        {result.error && <span>Http Error</span>}
                        {result.data && (
                            <img
                                width={300}
                                src={result.data.file}
                                alt=""
                            ></img>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
