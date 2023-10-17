import React from "react";
import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        // 실시간으로 데이터를 데이터 베이스에서 가져오기
        const q = query(
            collection(dbService, "nweets"),
            // where('text', '==', 'hehe') where 뿐만 아니라 각종 조건 넣어도 됨
            // orderBy("desc") 내림차순 정렬
            orderBy("createdAt","desc")
        ); 
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const nweetArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
            // console.log('Current nweets in CA:', nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const docRef = await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createdAt: serverTimestamp(),
                creatorId: userObj.uid,
            });
        } catch(error) {
            console.error("Error adding document:",error);
        }
        setNweet("");
    };

    const onChange = (event) => {
        // event 안에 있는 target 안에 있는 value를 달라고 하는 거임
        const { 
            target: { value }, 
        } = event;
        setNweet(value);
    };

    // console.log(nweets);
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    value={nweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120}
                />
                <input 
                    type="submit" 
                    value="Nweet" 
                />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;