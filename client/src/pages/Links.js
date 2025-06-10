import React from 'react';
import { Card } from 'react-bootstrap';
import '../utils/fonts/fonts.css';

import ChipIcon from '../components/images/ChipIcon.png';
import GallantLabsIcon from '../components/images/GallantLabsIcon.png';
import GitHubIcon from '../components/images/GitHubIcon.png';
import GmailIcon from '../components/images/GmailIcon.png';
import LinkedInIcon from '../components/images/LinkedInIcon.png';
import RightArrowIcon from '../components/images/RightArrowIcon.png';
import VBPixelImage from '../components/images/VBPixelImageLinks.png';


function Links() {
    const LinksPageText = `
                            Thank you for visiting my website! If you're interested, here are some links 
                            where you can learn more about me, and some work that interests me. 
                            Happy browsing!
                            `

    const LinksList = [
        {
            image: GitHubIcon,
            text: "My GitHub",
            onClickFunc: () =>
            window.open('https://github.com/Virb1010/', '_blank', 'noopener,noreferrer')
        },
        {
            image: GmailIcon,
            text: "Write me an email",
            onClickFunc: () =>
            window.open('mailto:virb1010@gmail.com', '_blank')
        },
        {
            image: LinkedInIcon,
            text: "My LinkedIn",
            onClickFunc: () =>
            window.open('https://www.linkedin.com/in/vir-bhatia/', '_blank', 'noopener,noreferrer')
        },
        {
            image: GallantLabsIcon,
            text: "Gallant Labs",
            onClickFunc: () =>
            window.open('https://www.gallantlab.org', '_blank', 'noopener,noreferrer')
        },
        {
            image: ChipIcon,
            text: "Fascinating Research Paper about Noise Injection in LLMs",
            onClickFunc: () =>
            window.open('https://arxiv.org/abs/2505.13500', '_blank', 'noopener,noreferrer')
        }
    ];







    return (
        <div className='LinksPage'>
            <div className='PageTitle'>{"Links"}</div>
            <img src={VBPixelImage} alt="Vir Bhatia" width={350} height={420} />
            <div className='LinksPageText'>{LinksPageText}</div>
            {LinksList.map((link, index) => (
                <Card
                    key={index}
                    className="d-flex flex-row align-items-center justify-content-between p-3 border border-dark rounded mt-4"
                    style={{ height: '4rem', width: '36rem', cursor: 'pointer', backgroundColor: '#f3efe9' }}
                    onClick={link.onClickFunc}
                >
                    <img src={link.image} alt={`${link.text} Icon`} width={45} height={45} />
                    <div>{link.text}</div>
                    <img src={RightArrowIcon} alt="Right Arrow" width={45} height={45} />
                </Card>
            ))}

        </div>
    ) 
}

export default Links;