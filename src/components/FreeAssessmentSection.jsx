import chart1 from '../assets/images/chart1.png';
import chart2 from '../assets/images/chart2.png';
import chart3 from '../assets/images/chart3.png';
import chart4 from '../assets/images/chart4.png';
import chart5 from '../assets/images/chart5.png';
import image from '../assets/images/image-6.jpg';

export default function FreeAssessmentSection() {
    return (
        <div className="w-full py-[40px] flex flex-col items-center gap-12">
            {/* Heading */}
            <h2 className="text-yellow text-2xl text-heading font-bold text-center">
                Our Free Assessment: Clarity Without Commitment
            </h2>

            {/* Top Row: Bar Graph + Description */}
            <div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl w-full">
                <img src={chart1} alt="Bar Chart" className="rounded-xl w-full md:w-[300px]" />
                <p className="text-Para text-left leading-7">
                    Our free solar assessment tool is as easy as ordering groceries online.
                    <br />
                    <br />
                    Just enter your address or pin code and details from a recent electricity bill.
                </p>
            </div>

            {/* Middle Row: 2 Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
                <img src={chart2} alt="Line Graph 1" className="w-full rounded-md" />
                <img src={chart3} alt="Line Graph 2" className="w-full rounded-md" />
            </div>

            {/* Description + Charts */}
            <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full items-start">
                {/* Text Description */}
                <div className="flex-1 text-Para leading-7">
                    <p>Our calculator uses local grid costs and your family’s energy usage to show you:</p>
                    <ul className="flex list-disc list-inside flex-col gap-5 space-y-2 mt-8">

                        <li>How much solar could save on your monthly bills.</li>
                        <li>The upfront costs and potential government subsidies.</li>
                        <li>Whether your rooftop is a good fit for solar panels.</li>
                    </ul>
                    <p className="text-yellow font-bold text-subHeading mt-8">
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
            <p className="text-white text-subHeading text-center mt-4">
                <span className="font-semibold">Curious about your numbers?</span> Try it to see how solar fits your home.
            </p>

            <button className="bg-yellow text-black text-Para font-bold px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
                Get your Solar Assessment Report
            </button>
            <div className="h-[300px] overflow-hidden">
                <img src={image} alt="Solar Building" className="w-full object-cover" />
            </div>

        </div>
    );
}
