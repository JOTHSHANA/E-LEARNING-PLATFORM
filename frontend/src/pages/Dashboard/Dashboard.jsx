import React, { useState } from "react";
import Layout from "../../components/appLayout/Layout";
import './Dashboard.css';
import Button from "../../components/Button/Button";
import CustomSelect from "../../components/Select/Select";
import customStyles from "../../components/appLayout/selectTheme";
import InputBox from "../../components/InputBox/InputBox";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function Dashboard() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {
    const handleClick = () => { };

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log('Selected:', selectedOption);
    };

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        console.log('Input value:', event.target.value);
    };

    // Original activity data
    const activityData = [
        { date: '2024-01-01', count: 1 },
        { date: '2024-01-02', count: 4 },
        { date: '2024-01-03', count: 2 },
        { date: '2024-01-04', count: 0 },
        { date: '2024-01-05', count: 5 },
        { date: '2024-01-06', count: 3 },
        { date: '2024-01-08', count: 1 },
    ];

    // Helper function to generate all dates between startDate and endDate
    const generateAllDates = (startDate, endDate) => {
        const dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().split('T')[0];
            const activity = activityData.find(data => data.date === dateString);
            dateArray.push({
                date: dateString,
                count: activity ? activity.count : -1,  // Fill skipped dates with count -1
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
    };

    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    const allDates = generateAllDates(startDate, endDate);  // Generate full date range with activity

    return (
        <>
            <div className="total-dashboard">
                {/* <Button
                    color="#fff"
                    backgroundColor="#007bff"
                    text="Click Me"
                    onClick={handleClick}
                />

                <CustomSelect
                    style={customStyles}
                    options={options}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    placeholder="Select an option"
                />

                <InputBox
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter text here"
                /> */}

                {/* <h3>Student Activity</h3>
                <div style={{ backgroundColor: "var(--background)", padding: "20px", borderRadius: "5px", border: "2px solid var(--border-color)" }}>
                    <CalendarHeatmap
                        startDate={startDate}
                        endDate={endDate}
                        values={allDates}
                        classForValue={(value) => {
                            if (!value || value.count === -1) {
                                return 'color-skipped';  // Special class for skipped dates (yellow)
                            } else if (value.count === 0) {
                                return 'color-empty';  // No activity (light gray)
                            } else {
                                return `color-scale-${Math.min(value.count, 4)}`;  // Assign color based on activity count
                            }
                        }}
                    />
                </div> */}

                <div className="dashboard-content">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus voluptatum dolorum, quod, fugiat modi exercitationem nam ullam totam et reprehenderit nulla. Voluptatibus deserunt at consequuntur maiores, totam, minima fugit eligendi ipsum corporis consectetur hic quis minus quaerat? Officiis, vitae ipsa, dolores natus explicabo architecto reiciendis esse delectus distinctio consequatur nam repudiandae doloribus excepturi minima fugiat perferendis! Optio facilis rem ut animi quo temporibus incidunt excepturi doloremque asperiores, eaque dolor, accusamus alias quos eum tenetur nesciunt? Excepturi modi ipsa quod esse adipisci nesciunt architecto ducimus, impedit, neque maiores cumque assumenda perferendis commodi magnam, eligendi consequuntur? Consequuntur at pariatur reiciendis. Eaque, quae expedita facere impedit beatae ab reprehenderit error voluptas id dolor atque cupiditate quia aliquam minima. Culpa maxime aut dolorem pariatur earum inventore ex repudiandae temporibus alias maiores. Dolore, blanditiis corrupti! Pariatur nesciunt, adipisci dignissimos, quo et molestiae corrupti natus tempora tenetur est, rerum illo quibusdam suscipit? Possimus quam quasi enim sint obcaecati inventore expedita totam et. Exercitationem itaque sequi tenetur consequatur voluptatem. Voluptatem quisquam quidem rem laboriosam ex distinctio! Eius laborum tenetur quasi dolor, optio dolores quibusdam officia. Veritatis, ad unde. Mollitia perspiciatis quibusdam soluta odit quia veritatis maiores dolores voluptate voluptatibus, maxime dolorem eum ea nam explicabo consequuntur reiciendis veniam cupiditate a? Harum, dolor? Doloremque totam harum, perspiciatis reiciendis, quos sed accusamus labore omnis provident, ducimus recusandae voluptatem odio expedita unde nemo! Expedita harum tempore debitis? Corrupti praesentium perferendis nam placeat odio cumque aliquid, reiciendis totam, fugit delectus itaque eum recusandae, ipsum fuga. Alias doloremque ullam vero facere suscipit minus qui dolore consequatur, officia exercitationem deserunt reprehenderit dolores magnam quam, ducimus a possimus velit natus eos autem dignissimos illum quod expedita minima. Accusantium nostrum, quam aspernatur nisi quibusdam quae mollitia facere at dolores sequi error ullam minima eius dolore, quod laudantium. Officia, accusamus harum numquam eos nulla velit reiciendis, quo, excepturi quis earum repudiandae? Dignissimos dolore ex beatae odit pariatur eum! Ipsum doloribus, error asperiores mollitia vel ut dolor dolorem vitae obcaecati vero aut. A placeat alias soluta ab fugiat ipsum sit aliquid, quas iure deleniti. Ipsa reprehenderit voluptate cumque tempora iste sed, voluptatibus similique autem numquam ex enim porro explicabo nemo ullam blanditiis. Debitis et ad perferendis ullam tenetur, ipsum beatae praesentium itaque, porro dolore accusantium repellat sapiente libero. Quisquam facilis alias obcaecati ab ducimus veniam veritatis incidunt, assumenda placeat corrupti dolores earum adipisci distinctio consectetur! Sequi ad alias voluptates laboriosam. Fuga, facilis doloremque quis explicabo vitae saepe quae repudiandae, rem, expedita vero placeat nostrum dolorum obcaecati quisquam ullam molestias? Repellendus reprehenderit molestiae vero magnam eum dicta consequuntur nobis aperiam! Doloremque quo labore officiis dolore. Possimus nemo et esse odio non. Eius architecto dignissimos voluptatibus culpa, explicabo quaerat doloremque reprehenderit ipsa quo perspiciatis? Provident, vel atque. Officia architecto nihil eveniet perspiciatis perferendis, neque nesciunt temporibus ipsa libero unde, ex, sint velit tempore ad aliquam recusandae mollitia omnis nobis corporis fugiat eos eum earum doloremque. Ad exercitationem vero harum qui? Atque saepe exercitationem aut tempore delectus similique qui corporis explicabo quae aperiam unde, modi incidunt laboriosam quas illum necessitatibus officiis omnis, enim cupiditate ratione ut dolor praesentium cumque? Corrupti obcaecati officiis eius alias praesentium quod? Quo corrupti saepe repudiandae perferendis dolores, voluptates molestiae neque similique iure ducimus inventore sed animi quis error nostrum, minima nihil. Doloremque architecto rem voluptatem dignissimos unde eveniet in vitae, optio est veritatis voluptatum totam at vero fugiat incidunt animi ullam facere voluptatibus provident nam! Quasi ducimus voluptates nemo veniam tempora at, qui unde, fugit totam eius nobis. Possimus quasi facilis deserunt laborum iste. Exercitationem ad quibusdam nihil? Aliquam quo commodi quod vel reiciendis? Debitis architecto in unde quod quisquam rem consectetur quis iusto, ipsa, at sapiente cum eveniet! Laborum sint illum itaque atque, aut ex ratione cupiditate odit similique cum quae exercitationem ut obcaecati earum quo modi architecto aspernatur voluptas laudantium vel excepturi sed. Labore optio id temporibus quam quia. Sapiente adipisci earum consectetur laudantium distinctio nobis alias quo, officiis dolores totam cupiditate! Dolorum architecto qui esse atque sunt sapiente neque a expedita. Accusamus in eius animi perferendis dolor fuga quas. Obcaecati, cumque natus et corrupti fugiat quo error doloremque excepturi quidem quod maxime fugit nihil deserunt explicabo consequatur necessitatibus! Mollitia et sint quisquam quos qui similique nesciunt, nobis iste optio ut eum adipisci ad ratione laborum saepe quibusdam praesentium assumenda rerum deleniti. Laborum iste corrupti sint itaque, laboriosam, inventore illo similique vel maiores quos unde mollitia voluptates labore ut quia optio ea placeat odio debitis temporibus! Vitae harum similique nisi ab repellat accusantium iusto, asperiores nulla voluptatem cupiditate rerum? Obcaecati ipsum quae cumque neque illum, nihil maxime possimus illo doloremque ratione quidem quam deserunt dolorem fugit quos a fuga in distinctio quisquam, maiores repellendus quod error! Excepturi aperiam inventore animi quasi deserunt hic quibusdam fugit temporibus illo eum. Ad, atque. Eligendi, id ab? Similique voluptate nulla temporibus? Ad sed rerum praesentium placeat nulla quos aut. Delectus labore corrupti dicta nulla molestiae cum eius maxime sint sequi dignissimos sit ipsum possimus dolores autem blanditiis impedit voluptatibus, enim minus minima facilis voluptates quos eveniet perspiciatis! Voluptate officia in cumque quo nulla provident sed nostrum ad expedita ut magnam dignissimos autem quibusdam voluptas, repellat, illum, repellendus voluptatibus quia harum veritatis molestiae excepturi similique. Hic magni quibusdam, laudantium voluptatum minima rem totam sint tempore alias odio? Corrupti id aliquid veritatis harum voluptatum at officiis quibusdam atque quia maiores praesentium qui molestias cumque ipsum vitae eveniet aperiam, laboriosam eaque facilis! Saepe corrupti odit voluptatum quia neque facilis ut eligendi architecto quo. Excepturi aliquid illum aspernatur similique, magnam quas repellendus maxime. Similique quas provident laboriosam, aspernatur iusto delectus iure quisquam facere mollitia vitae obcaecati voluptate recusandae, ipsum omnis accusamus consequuntur magni quibusdam animi id laudantium! Adipisci at, velit distinctio ex accusamus amet possimus. Enim repellendus quisquam perferendis totam hic deleniti non maiores consequatur nemo harum dolorum tempora voluptatem vitae, sunt quibusdam sequi quas in consectetur provident delectus mollitia qui. Dolores temporibus repellat eligendi ratione quo minus vero incidunt, fuga dicta facilis enim pariatur architecto cumque vitae? Beatae similique delectus ab magni minima, quod quibusdam, nostrum cupiditate nobis, ratione consectetur!
                    <h3>Student Activity</h3>
                    <div style={{ backgroundColor: "var(--background)", padding: "20px", borderRadius: "5px", border: "2px solid var(--border-color)" }}>
                        <CalendarHeatmap
                            startDate={startDate}
                            endDate={endDate}
                            values={allDates}
                            classForValue={(value) => {
                                if (!value || value.count === -1) {
                                    return 'color-skipped';  // Special class for skipped dates (yellow)
                                } else if (value.count === 0) {
                                    return 'color-empty';  // No activity (light gray)
                                } else {
                                    return `color-scale-${Math.min(value.count, 4)}`;  // Assign color based on activity count
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="profile-container">
                    <div className="profile-card">
                        Profile
                        <hr style={{ width: "100%" }} />
                        <div className="pic-container">
                            JOTHSHANA S M
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
