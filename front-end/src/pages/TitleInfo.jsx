import '../styles/Info.css'
import {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {tt_URL} from '../apiConfig'
import axios from 'axios'
import Img from '../logo.svg'

import {NavBar} from '../components/NavBar'
import {Logo} from '../components/Logo'

const TitleInfo = () => {

    const { titleID } = useParams()
    const [title, setTitle] = useState({})
    const navigate = useNavigate(-1)

    const handleData = (data) => {
        setTitle(data)
        console.log(data)
    }

    useEffect(() => {
        console.log('Effect is running with values:', { tt_URL, titleID, navigate})
        const getTitle = async () => {
            try {
                const response = await axios.get(tt_URL + '/' + titleID)
                console.log('Response:', response)
                handleData(response.data)
            } catch (error) {
                console.error('Error fetching title information', error)
                navigate(-1)
            }
        }
    
        getTitle()
    }, [titleID, navigate])

    return (
        <>
        <NavBar>
            <Logo/>
        </NavBar>
        <div className="info-container">
            {title ? (
                Object.keys(title).length > 0 ? (
                <>
                    <div className="info-title">{title.originalTitle}</div>
                    <div className="info-image-container">
                        <img className="info-img" src={Img} alt="Default"></img>
                    </div>
                    <div className="info-details">
                        {/* <p>ID: <span>{title.titleID}</span></p> */}
                        <p>OriginalTitle: <span>{title.originalTitle}</span></p>
                        <p>Type: <span>{title.type}</span></p>
                        <p>StartYear: <span>{title.startYear}</span></p>
                        <p>Genres: {
                            title.genres && title.genres.length > 0 ? (
                                title.genres.map((genre, index) => (
                                    <span key={index}>
                                        {genre.genreTitle}
                                        {index !== title.genres.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                            ) : (
                                <span>No genres available</span>
                            )}
                        </p>
                        <p>Akas: {
                            title.titleAkas && title.titleAkas.length > 0 ? (
                                title.titleAkas.map((aka, index) => (
                                    <span key={index}>
                                        {aka.akaTitle}
                                        {index !== title.titleAkas.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                            ) : (
                                <span>No Akas available</span>
                            )}
                        </p>
                        <p>Contributors: {
                            title.principals && title.principals.length > 0 ? (
                                title.principals.map((contributor, index) => (
                                    <span className="info-button-container" key={index}>
                                        <Link to={`/name/${contributor.nameID}`}>
                                            <button className="info-button">{contributor.name}</button>
                                        </Link>
                                        {/* {index !== title.principals.length - 1 ? ', ' : ''} */}
                                    </span>
                                ))
                            ) : (
                                <span>No Contributors available</span>
                            )}
                        </p>
                        {title.rating && typeof title.rating === 'object' && Object.keys(title.rating).length > 0 ? (
                            <>
                            <p className="info-label">Average Rating: <span>{title.rating.avRating}</span></p>
                            <p className="info-label">Votes: <span>{title.rating.nVotes}</span></p>
                            </>
                        ):(
                            <span>No Rating available</span>
                        )}
                    </div>
                </>
                ):(
                    <div className="info-title">Loading...&#9829;</div>
                )
            ):(
                <div className="info-title">No title found. &#128546;</div>
            )}
        </div>
    </>
    )
}

export default TitleInfo