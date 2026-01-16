import ContactSection from "../ContactSection"
import About from "./about"
import Hero from "./hero"
import SmartFeatures from "./SmartFeatures"

const Home = () => {
    return (
        <>
            <Hero />
            <SmartFeatures />
            <About />
            <ContactSection/>
        </>
    )
}

export default Home