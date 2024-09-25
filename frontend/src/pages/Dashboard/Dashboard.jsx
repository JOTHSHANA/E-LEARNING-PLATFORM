import React, { useState } from "react";
import Layout from "../../components/appLayout/Layout";
import './Dashboard.css';
import Button from "../../components/Button/Button";
import CustomSelect from "../../components/Select/Select";
import customStyles from "../../components/appLayout/selectTheme";
import InputBox from "../../components/InputBox/InputBox";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getDecryptedCookie } from "../../components/utils/encrypt";

function Dashboard() {
    return <Layout rId={1} body={<Body />} />;
}

function Body() {
    const name = getDecryptedCookie("name");
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
            
                <div className="dashboard-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia maxime eligendi repellendus. Reprehenderit quas fugiat libero magnam at officiis nihil numquam. Laborum eaque magnam incidunt soluta ipsum modi tempore beatae veniam sint, dolore molestiae cumque quisquam. Cumque maxime, ex maiores quo non nulla perferendis aperiam, vitae sed repellendus voluptatem ducimus ipsa quas laborum eligendi id! Quibusdam nihil maxime voluptatum consectetur deserunt consequatur esse excepturi eligendi aspernatur velit, corrupti deleniti asperiores! Soluta dolorum reiciendis quam pariatur quod adipisci excepturi a iste, repellendus dolor quasi voluptate quaerat! Officiis, iste veritatis quae nostrum, libero saepe at distinctio tempora repellat error ipsam nisi. Ex labore est neque! Excepturi ratione fugit quo sed consequuntur architecto eligendi odio, animi, nisi hic voluptatibus nemo praesentium enim. Nobis quo optio alias reiciendis numquam quae accusantium omnis aliquam cum odit, ea placeat quibusdam culpa quam nostrum, ullam voluptatibus. Dolorum quas reprehenderit recusandae sint blanditiis, nulla nobis fugiat delectus, voluptates error sed tempore inventore facere corrupti facilis hic aspernatur placeat cupiditate doloremque esse. Nesciunt ratione non illum voluptas impedit veniam sed eaque deserunt nihil, nobis excepturi dolorem facilis numquam debitis quod possimus placeat. Iure reprehenderit est dicta, ad illum amet nulla a, aliquam repellat id aliquid similique itaque quia quod fugiat voluptates neque laboriosam porro nostrum magni accusamus vitae natus, officia rem. In ipsa rem repellat deleniti dignissimos dolore? Labore numquam omnis optio molestiae consequatur sint distinctio maxime, maiores aliquid rem saepe fugiat provident impedit fuga quaerat asperiores ea eligendi quis, blanditiis dolor magnam commodi quibusdam at unde! Error expedita blanditiis doloremque! Corrupti vel aspernatur deserunt! At nemo sunt et totam earum illum reiciendis quisquam voluptatem sapiente fugiat, dolorem non accusantium, quia soluta culpa sequi harum, cum magni. Nostrum possimus corrupti distinctio nesciunt cum saepe, sit facilis aspernatur debitis id? Ipsum nihil asperiores laboriosam exercitationem nesciunt quod maxime sit nam quaerat cupiditate odit minus, dicta alias earum minima ab tempora facere. Et ullam distinctio aperiam est tempore ratione quidem quam cupiditate cumque illo eaque doloribus quisquam debitis tempora quasi dolores voluptate porro rerum, quaerat quos libero dignissimos possimus. Non minus repudiandae odit ipsum, quasi doloribus rerum amet? Iste ab eos iure. Quisquam dolorum sed odio ducimus, laboriosam possimus voluptatum minus sit tempora cumque? Animi id atque impedit quia iste? Dicta, ipsam culpa, quia illo porro illum debitis voluptate rem voluptates consequatur sunt nemo placeat alias cumque possimus voluptas hic modi impedit eum doloribus consequuntur quod accusamus. Quae quasi dolorum iusto minus? Incidunt, ipsam cum? Aliquam natus maxime fugiat, sed distinctio accusamus! At enim ratione ad iste dicta architecto non excepturi atque beatae tenetur dolore illo corrupti totam praesentium alias recusandae sit quae delectus, esse, officia molestiae accusamus quas earum. Necessitatibus harum error eum minima dignissimos perferendis odit. Vitae error facere distinctio, perspiciatis hic quis a eos quod quibusdam recusandae ratione. Alias facere omnis dicta aliquid maxime architecto veritatis maiores consequuntur asperiores tenetur officiis iure quia inventore optio esse ipsa aut expedita, at error. Earum non cum ullam, dignissimos alias quas. Eaque fuga quis quibusdam earum nobis pariatur dolores corrupti sed similique atque architecto maiores, velit odit nisi laudantium ut cumque tenetur, dolorem impedit enim quod! Nemo officiis soluta totam, repudiandae commodi excepturi? Cupiditate consequatur quidem dignissimos vitae et maxime. Culpa voluptatem mollitia quisquam numquam quaerat omnis labore perspiciatis quam tempore dolores velit dolorem excepturi quae voluptatum assumenda perferendis, nam obcaecati autem unde dicta odio maxime harum quas! At asperiores nesciunt necessitatibus adipisci repellendus accusantium, enim assumenda ex quasi et odit vitae dolorem modi. Aut, similique vero consectetur aspernatur accusantium dolore quaerat culpa, rerum maiores enim sequi sint voluptatem, esse modi quibusdam cumque optio! Voluptates saepe ad rem corrupti officia voluptatibus. Quas sapiente asperiores harum minima, dolorem error omnis molestias unde eligendi reiciendis provident beatae, dicta explicabo totam cum ducimus repudiandae adipisci eos dignissimos illum? Praesentium quibusdam esse sequi enim! Repellat veritatis autem consequatur quaerat libero dolor. Quam dolore ullam quas. Mollitia corporis doloribus dolore accusamus cumque voluptas earum nam quo suscipit maiores totam est, optio maxime natus voluptate numquam, laudantium delectus harum animi vel aspernatur sed. Animi explicabo hic maxime accusantium ab ex dolorum, perferendis sed? Ipsa fuga fugit, minus nulla atque asperiores obcaecati eveniet dolore tenetur, sed provident nam iste natus maiores aliquam accusamus a odio nobis aliquid minima. Laboriosam quibusdam dolor est libero rem dolorum animi iusto reiciendis. Reprehenderit quo minima aliquid mollitia quisquam at vel dicta. Nihil fuga qui excepturi repellendus natus ut architecto nobis soluta quam unde sapiente, corporis praesentium eaque voluptate corrupti reprehenderit quisquam molestias, mollitia tempora quibusdam saepe! Nostrum, consequatur autem veritatis omnis quisquam minima sequi eum suscipit alias unde quis laudantium id voluptas, nemo sit sed commodi eligendi enim. Tempora, a eius aperiam voluptates repellat eveniet animi id vitae, magnam optio omnis quo, earum rem ipsum! Quaerat, placeat? Deleniti placeat consequuntur maxime perspiciatis reiciendis ipsum beatae, veritatis, aspernatur atque laudantium dolores. Dicta nam corporis hic? Laudantium quia illo perferendis odit excepturi ducimus praesentium repellendus dolores est dolore! Cum necessitatibus modi amet? Suscipit, enim. Odit laudantium eos quaerat maxime perferendis quasi harum temporibus repellendus asperiores sed modi aut alias ipsum neque ipsa eum adipisci iusto facilis, iure sunt. Nihil rem eius minus voluptatum quae reprehenderit quaerat velit hic consequatur alias ratione natus sunt repudiandae commodi fugiat ea, quisquam quod culpa numquam aperiam delectus voluptatem corrupti asperiores eos? Beatae provident in ab ullam perspiciatis modi consequuntur at consequatur rerum sequi? Mollitia molestias quidem repudiandae facere corporis laborum magni odio aliquam dolor amet aliquid quos a eaque omnis autem dicta minus, quisquam laboriosam iste soluta! Explicabo a tempora obcaecati qui maiores quibusdam rerum quos aspernatur perferendis, quis placeat facere velit officiis quam quidem? Exercitationem deserunt veniam iste qui consequuntur, mollitia eum illum ea, soluta ab porro quidem veritatis adipisci vitae odit doloremque voluptates obcaecati optio est hic voluptatem eaque provident. Placeat eaque consectetur id veritatis repellat eveniet, autem reprehenderit quae non dolor modi labore magnam praesentium minima doloremque tempore atque. Et tenetur recusandae expedita error, sunt dicta corrupti id porro alias ipsum aspernatur incidunt nulla consequuntur reiciendis minus maxime necessitatibus commodi? Adipisci unde obcaecati consequatur mollitia?
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
                            tooltipDataAttrs={(value) => {
                                // Only show tooltip for valid dates
                                if (value.count !== -1) {
                                    return {
                                        'data-tip': `${value.date}: ${value.count} activity`,
                                    };
                                }
                            }}
                            transformDayElement={(rect, value) => {
                                // Only show tooltip for valid dates
                                if (value && value.count !== -1) {
                                    return (
                                        <Tooltip
                                            title={`${value.date}: ${value.count} activities`}
                                            arrow
                                            placement="top"
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        bgcolor: '#333',
                                                        color: '#fff',
                                                        fontSize: '12px',
                                                        p: '8px',
                                                        borderRadius: '4px',
                                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                                        textAlign: 'center',
                                                    },
                                                },
                                                arrow: {
                                                    sx: {
                                                        color: '#333',
                                                    },
                                                },
                                            }}
                                        >
                                            {rect}
                                        </Tooltip>
                                    );
                                }
                                return rect;
                            }}
                        />
                    </div>
                </div>

                <div className="profile-container">
                    <div className="profile-card">
                        Profile
                        <hr style={{ width: "100%" }} />
                        <div className="pic-container">
                            {name}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
