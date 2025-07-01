import VBPixelImage from '../components/images/VBPixelImageAboutMe.png';
import { useEffect } from 'react';

function AboutMe() {
    useEffect(() => {
        document.title = "About Me";
    }, []);

    const AboutMePageText = `
Hi, I’m Vir. I recently graduated from university with degrees in Computer Science and Cognitive & Brain Science. I chose those fields because I’ve always been drawn to how people think. I started off interested in psychology: how we form habits, make decisions, and interact with each other. But as much as I liked the questions, I wanted more concrete ways to explore them.

That curiosity pulled me toward human-computer interaction and brain-computer interfaces. Suddenly, the questions I cared about had new ways in - through tangible data, and systems of reasoning grounded in science. I started working on projects that explored how brain activity might relate to behavior, or how emotion could be interpreted through subtle changes in expression. What began as an interest in people became something I could build with, experiment with, and learn from.

The more I build, the more I believe that the future of technology isn’t just about smarter machines, it’s about more meaningful connections between people and the tools they use.
The Loop is where I hope to explore that connection in the open. It’s a space where I share what I’m working on, thinking about, and trying to understand. But it’s also meant to be a space for others to do the same, whatever form that takes. I hope we can all come together to talk about research and projects we’ve been working on, our views on the state of the tech world, our personal experiences and knowledge, or anything else! Wherever you are on your journey with technology, if you’re excited by how it shapes the way we live, work, or think, this space is for you.

I’m still early in my journey, and this site is one way I’m figuring things out as I go. If you’re interested in keeping in touch, join the mailing list (coming soon). I’d love to have you along.

Let’s learn out loud - and build something meaningful while we’re at it.
`

    return (
        <div className='AboutMePage'>
            <div className='PageTitle'>About Me</div>
            <img src={VBPixelImage} alt="Vir Bhatia" className="AboutMeImage" />
            <div className='AboutMePageTextContainer'>
                <div className='AboutMePageText'>{AboutMePageText}</div>
            </div>
        </div>
    )
}

export default AboutMe;
