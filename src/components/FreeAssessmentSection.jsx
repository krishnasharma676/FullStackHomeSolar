import chart1 from '../assets/images/chart-6.gif';
import chart2 from '../assets/images/dashboard.png';
import chart3 from '../assets/images/chart3.png';
import chart4 from '../assets/images/chart4.png';
import chart5 from '../assets/images/chart5.png';
import image from '../assets/images/image-6.jpg';
import SolarButton from './SolarButton';

export default function FreeAssessmentSection({ openModal }) {
    return (
        <div className="w-full py-10 px-4 md:px-10 flex flex-col items-center gap-8 bg-black text-white">
            {/* Heading */}
            <h2 className="text-heading font-bold text-center leading-tight">
                Our Free Assessment : <span className='text-green'>Clarity Without Commitment</span>
            </h2>

            {/* Top Row: Bar Graph + Description */}
            <div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center gap-6 w-full max-w-6xl">
                {/* Text on Left */}
                <p className="subHeading2 text-left bg-white text-black p-6 md:p-10 rounded-xl w-full md:w-2/3 text-sm md:text-base leading-relaxed">
                    Our free solar assessment tool is as easy as ordering groceries online.
                    <br />
                    Just enter your address or pin code and details from a recent electricity bill.
                </p>

                {/* Image on Right */}
                <img
                    src={chart1}
                    alt="Bar Chart"
                    className="rounded-xl w-full md:w-1/3 max-w-[300px] object-contain"
                />
            </div>

            {/* Middle Chart Image */}
            <img
                src={chart2}
                alt="Line Graph"
                className="rounded-md w-full max-w-6xl object-contain"
            />

            {/* Chart Description Section */}
            <div className="flex flex-col md:flex-row gap-10 max-w-6xl w-full items-start mt-6">
                {/* Description */}
                <div className="flex-1 text-para space-y-6 text-sm md:text-base">
                    <p>
                        Our calculator uses local grid costs and your family’s energy usage to show you:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>How much solar could save on your monthly bills?</li>
                        <li>The upfront costs and potential government subsidies?</li>
                        <li>Whether your rooftop is a good fit for solar panels?</li>
                    </ul>
                    <p className="text-yellow font-bold text-subheading mt-4">
                        It’s like getting a tailored financial plan for your family’s solar journey, without any commitment.
                    </p>
                </div>

                {/* Side Charts */}
                <div className="flex flex-col gap-4 w-full md:w-[300px]">
                    <img src={chart4} alt="Chart 4" className="w-full rounded-md object-contain" />
                    <img src={chart5} alt="Chart 5" className="w-full rounded-md object-contain" />
                </div>
            </div>

            {/* CTA */}
            <p className="text-subheading text-center mt-8">
                <span className="font-bold">Curious about your numbers?</span> Try it to see how solar fits your home.
            </p>
            <SolarButton onClick={openModal}>
                Get your Solar Assessment Report
            </SolarButton>

            {/* Banner Image */}
            <div className="h-[200px] md:h-[300px] overflow-hidden mt-10 w-full">
                <img
                    src={image}
                    alt="Solar Building"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
