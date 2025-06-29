import chart1 from '../assets/images/chart-6.gif';
import chart2 from '../assets/images/dashboard.png';
import chart3 from '../assets/images/chart3.png';
import chart4 from '../assets/images/chart4.png';
import chart5 from '../assets/images/chart5.png';
import image from '../assets/images/image-6.jpg';
import SolarButton from './SolarButton';

export default function FreeAssessmentSection({ openModal }) {
    return (
        <div className="w-full py-[40px] flex flex-col items-center gap-5">
            {/* Heading */}
            <h2 className="text-heading font-bold text-center">
                Our Free Assessment : <span className='text-green'>Clarity Without Commitment</span>
            </h2>

            {/* Top Row: Bar Graph + Description */}
            <div className="flex flex-col md:flex-row-reverse justify-between px-7 items-center w-full">
                {/* Image on Right */}
                <img
                    src={chart1}
                    alt="Bar Chart"
                    className="rounded-xl w-full md:w-[250px]"
                />

                {/* Text on Left */}
                <p className="subHeading2 text-left bg-white text-black p-10 rounded-xl">
                    Our free solar assessment tool is as easy as ordering groceries online.
                    <br />
                    Just enter your address or pin code and details from a recent electricity bill.
                </p>
            </div>

            <img src={chart2} alt="Line Graph 1" className=" h-[700px] w-full rounded-md" />

            {/* Description + Charts */}
            <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full items-start">
                {/* Text Description */}
                <div className="flex-1 text-para">
                    <p>Our calculator uses local grid costs and your family’s energy usage to show you:</p>
                    <ul className="flex list-disc list-inside flex-col gap-3 space-y-2 mt-8">

                        <li>How much solar could save on your monthly bills ?</li>
                        <li>The upfront costs and potential government subsidies ?</li>
                        <li>Whether your rooftop is a good fit for solar panels ?</li>
                    </ul>
                    <p className="text-yellow font-bold text-subheading mt-8">
                        It’s like getting a tailored financial plan for your family’s solar journey, without any commitment.
                    </p>
                </div>

                {/* Side Charts */}
                <div className="flex flex-col gap-4 w-full md:w-[300px]">
                    <img src={chart4} alt="Chart 4" className="w-full rounded-md" />
                    <img src={chart5} alt="Chart 5" className="w-full rounded-md" />
                </div>
            </div>

            {/* CTA */}
            <p className="text-white text-subheading text-center mt-4 mb-4">
                <span className="font-bold">Curious about your numbers?</span> Try it to see how solar fits your home.
            </p>
            <SolarButton onClick={openModal}>
                Get your Solar Assessment Report
            </SolarButton>

            <div className="h-[300px] overflow-hidden">
                <img src={image} alt="Solar Building" className="w-full object-cover" />
            </div>

        </div>
    );
}
