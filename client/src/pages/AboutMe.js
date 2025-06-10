import React from 'react';
import VBPixelImage from '../components/images/VBPixelImageAboutMe.png';

function AboutMe() {
    const AboutMePageText = `
Hi, I’m Vir. I studied computer science and cognitive & brain science because I’ve always been drawn to the ways people think and the ways we build. Somewhere along the way, I found myself caught up in the space where those two things meet - where code tries to understand people, and people try to understand machines.

In college, I started off interested in psychology. I wanted to know why people do what they do - how we form patterns, make decisions, and interact with each other. But as much as I loved the questions, I found myself wanting more concrete ways to explore them. When I discovered computational modeling and neurotechnology - like fMRI and brain decoding - it felt like a light switched on. Suddenly there were tools, algorithms, and languages that could engage those same questions in new ways.

That’s how I found my way to human-computer interaction and brain-computer interfaces. For me, these aren’t just technical fields - they’re creative, curious, and deeply human. I’ve worked on projects that try to understand emotion through facial expression, or map brain activity to behavior in real time. And the more I build, the more I believe that the future of technology isn’t just smarter machines - it’s more meaningful connections between people and the tools they use.

The Interface is my attempt to create a space for that kind of exploration. I built it as a place to share the things I’ve been working on, thinking about, and learning from - and hopefully to invite others to do the same. Whether it’s writing, projects, links, or open questions, this site is meant to be a shared workspace for anyone interested in HCI, BCIs, or tech in general.

I’m still very much at the beginning of my career, and I’m learning as I go. That’s part of why this space exists - because the best way to grow is to be in conversation with other people who care about the same things, or who challenge you to think differently. If you’re curious, I’d love for you to explore, contribute, or just say hi.

And if you'd like to stay tuned as this space evolves, feel free to join the mailing list. I’d love to have you along.

Let’s learn out loud - and build something meaningful while we’re at it.
`

    return (
        <div className='AboutMePage'>
            <div className='PageTitle'>About Me</div>
            <img src={VBPixelImage} alt="Vir Bhatia" width={808} height={480} />
            <div className='AboutMePageText'>{AboutMePageText}</div>
        </div>
    )
}

export default AboutMe;