import { useState, useEffect } from "react";
import { AiFillSound } from "react-icons/ai";
import Header from "./Header";
import TopHeader from "./TopHeader";
import Loader from "./Loader";
const Generator = () => {
    const [search, setSearch] = useState("happy");
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchWord = async () => {
            const ApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`;
            const response = await fetch(ApiUrl);
            const data = await response.json();
            setWords(data);
            setLoading(false);
        };
        searchWord();
    }, [search]);

    const playSound = () => {
        const sound = document.querySelector("#sound");
        sound.play();
    };
    return (
        <>
            <TopHeader />
            <Header setSearch={setSearch} />
            <div className="bg-gray-100  dark:bg-gray-700">
                <div className="container font-redhat p-4 mx-auto flex justify-center space-x-4 md:flex-row flex-col md:space-y-0 space-y-6 items-center    h-full">
                    <div className="w-full  md:w-full  py-6 shadow-lg bg-white rounded-md flex flex-col justify-center items-center text-left hover:shadow-xl cursor-pointer dark:bg-gray-600 dark:text-white">
                        {loading ? (
                            <Loader />
                        ) : words.length ? (
                            words.map((element, index) => {
                                let { word, phonetic, origin } = element;
                                return (
                                    <>
                                        <div className="px-4 w-full" key={index}>
                                            <section className="flex justify-between items-center py-2 border-b border-gray-500">
                                                <h2 className=" text-gray-700 dark:text-white text-2xl font-bold capitalize ">{word}</h2>
                                                <AiFillSound
                                                    className="dark:text-cyan-400 text-2xl"
                                                    onClick={() => {
                                                        playSound();
                                                    }}
                                                />
                                            </section>
                                            <h3 className="text-gray-600 dark:text-gray-300 font-bold text-lg pt-2">{phonetic}</h3>
                                            <h2 className="text-gray-600 dark:text-gray-300 text-lg">{origin}</h2>
                                            <h2 className="text-gray-600 dark:text-gray-200">{element.meanings[0].partOfSpeech}</h2>
                                            <p className="text-gray-600 dark:text-gray-200 py-1">{element.meanings[0].definitions[0].definition}</p>
                                            <p className="text-gray-600 dark:text-gray-200">{element.meanings[0].definitions[0].example}</p>
                                            {element.meanings.map((items, index) => {
                                                let syn = items.definitions[0].synonyms;
                                                let ant = items.definitions[0].antonyms;
                                                return (
                                                    <div className="" key={index}>
                                                        <p className="text-gray-500 dark:text-gray-200 text-lg ">{items.partOfSpeech}</p>
                                                        <p className="text-gray-500 dark:text-gray-200 text-lg py-1">{items.definitions[0].definition}</p>
                                                        <p className="text-gray-500 dark:text-gray-200 text-lg ">{items.definitions[0].example}</p>
                                                        <p className="text-gray-500 dark:text-gray-400  py-2 flex flex-wrap border-t border-gray-500">
                                                            {syn.length ? (
                                                                syn.map((elem, index) => {
                                                                    return (
                                                                        <span key={index}>
                                                                            <span className="pr-2">{elem},</span>
                                                                        </span>
                                                                    );
                                                                })
                                                            ) : (
                                                                <span>No Information..</span>
                                                            )}
                                                        </p>
                                                        <p className="text-gray-400 py-2 flex flex-wrap border-t border-gray-500">
                                                            {ant.length ? (
                                                                ant.map((elem, index) => {
                                                                    return (
                                                                        <span key={index}>
                                                                            <span className="pr-2">{elem},</span>
                                                                        </span>
                                                                    );
                                                                })
                                                            ) : (
                                                                <span>No Information..</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                            <audio src={element.phonetics[0].audio} className="my-4" id="sound"></audio>
                                        </div>
                                    </>
                                );
                            })
                        ) : (
                            <h3 className=" text-gray-700 dark:text-white p-2 m-0 text-center text-3xl">No Details Found</h3>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Generator;
