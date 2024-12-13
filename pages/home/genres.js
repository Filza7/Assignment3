

import React from 'react';
import Genre from '../Components/Genre'; 
import { fetchAndOrganizeData } from '../extrafunc'; 
const GenresPage = ({ genres }) => {
    return (
        <div style={{ textAlign: "center", fontFamily: "cursive" }}>
            <h1>Genres</h1>
            <Genre list={genres} />
        </div>
    );
};


export async function getServerSideProps() {
    try {
        const { genres } = await fetchAndOrganizeData(); 

        
        if (!genres) {
            return { notFound: true };
        }

        return {
            props: {
                genres: genres || [], 
            },
        };
    } catch (error) {
        console.error('Error fetching genres:', error);
        return {
            props: {
                genres: [], 
            },
        };
    }
}

export default GenresPage;
