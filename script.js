document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('button');
    const dateInput = document.getElementById('dateInput');

    button.addEventListener('click', fetchEvents);
    dateInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            fetchEvents();
        }
    });
});

function fetchEvents() {
    const dateInput = document.getElementById('dateInput').value;
    const [month, day] = dateInput.split('-').map(num => parseInt(num, 10));

    if (!month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
        alert('Please enter a valid date in MM-DD format.');
        return;
    }

    const events = getHistoricalEvents(month, day); 

    displayResults(events);
}

function getHistoricalEvents(month, day) {
    const events = {
        '01-01': [
            '45 BC - The Julian calendar takes effect for the first time.',
            '1660 - Samuel Pepys begins his diary.',
            '1990 - David Dinkins is sworn in as New York City\'s first black mayor.'
        ],
        '01-02': [
            '366 - The Alemanni cross the frozen Rhine River in large numbers, invading the Roman Empire.',
            '1927 - Angered by the anti-Semitic attitude of the United States, Romanian intellectuals led by Nicolae Iorga begin the formation of the National-Christian Defense League.',
            '2004 - Stardust successfully flies past Comet Wild 2, collecting samples that are returned to Earth.'
        ],
        '01-03': [
            '1521 - Pope Leo X excommunicates Martin Luther in the papal bull Decet Romanum Pontificem.',
            '1959 - Alaska is admitted as the 49th U.S. state.',
            '2009 - The first block of the blockchain of the decentralized payment system Bitcoin, called the Genesis block, was established by the creator of the system, Satoshi Nakamoto.'
        ],
        '01-04': [
            '1847 - Samuel Colt sells his first revolver pistol to the United States government.',
            '1965 - United States President Lyndon B. Johnson proclaims his "Great Society" during his State of the Union address.',
            '2010 - The Burj Khalifa, the current tallest building in the world, officially opens in Dubai.'
        ],
        '01-05': [
            '1477 - Battle of Nancy: Charles the Bold is defeated and killed in a conflict with René II, Duke of Lorraine.',
            '1914 - The Ford Motor Company announces an eight-hour workday and a minimum wage of $5 for a day\'s labor.',
            '2015 - NASA\'s Dawn spacecraft enters orbit around the dwarf planet Ceres.'
        ],
        '01-06': [
            '1066 - Harold Godwinson is crowned King of England.',
            '1912 - New Mexico is admitted as the 47th U.S. state.',
            '2005 - A Boeing 737 belonging to Indonesian airline Lion Air crashes into the ocean near the island of Java, killing 26.'
        ],
        '01-07': [
            '1558 - France takes Calais, the last continental possession of England.',
            '1927 - The first transatlantic telephone service is established from New York City to London.',
            '2015 - Two gunmen commit a mass shooting at the offices of Charlie Hebdo in Paris, killing twelve people and injuring eleven others.'
        ],
        '01-08': [
            '1790 - George Washington delivers the first State of the Union address in New York City.',
            '1835 - The United States national debt is zero for the only time.',
            '2002 - President George W. Bush signs into law the No Child Left Behind Act.'
        ],
        '01-09': [
            '1431 - Judges\' investigations for the trial of Joan of Arc begin in Rouen, France, the seat of the English occupation government.',
            '1861 - American Civil War: Mississippi becomes the second state to secede from the Union before the outbreak of hostilities.',
            '2007 - Apple CEO Steve Jobs introduces the first iPhone.'
        ],
        '01-10': [
            '1776 - Thomas Paine publishes his pamphlet "Common Sense", advocating for American independence from Britain.',
            '1863 - The first underground railway in the world opens in London, England.',
            '1929 - The Adventures of Tintin, one of the most popular European comic books, is first published.'
        ],
        '01-11': [
            '532 - Nika riots in Constantinople.',
            '1922 - Insulin is first used to treat diabetes in a human patient.',
            '2003 - Illinois Governor George Ryan commutes the death sentences of 167 prisoners on Illinois\' death row based on the Jon Burge scandal.'
        ],
        '01-12': [
            '1773 - The first public museum in America is established in Charleston, South Carolina.',
            '1915 - The United States House of Representatives rejects a proposal to give women the right to vote.',
            '2005 - Deep Impact launches from Cape Canaveral on a Delta II rocket on a Delta 7925H-9.5 rocket.'
        ],
        '01-13': [
            '1893 - The Independent Labour Party of the United Kingdom holds its first meeting.',
            '1990 - Douglas Wilder becomes the first elected African American governor as he takes office in Richmond, Virginia.',
            '2012 - The passenger cruise ship Costa Concordia sinks off the coast of Italy due to the negligence of the captain, resulting in the deaths of 32 people.'
        ],
        '01-14': [
            '1639 - The "Fundamental Orders", the first written constitution that created a government, is adopted in Connecticut.',
            '1907 - An earthquake in Kingston, Jamaica, kills more than 1,000.',
            '2011 - The Tunisian government falls after a month of increasingly violent protests.'
        ],
        '01-15': [
            '1559 - Elizabeth I is crowned Queen of England in Westminster Abbey, London.',
            '1919 - Ignacy Jan Paderewski becomes Prime Minister of the newly independent Poland.',
            '2009 - US Airways Flight 1549 makes an emergency landing in the Hudson River shortly after takeoff from LaGuardia Airport in New York City.'
        ],
        '01-16': [
            '27 BC - Gaius Julius Caesar Octavianus is granted the title Augustus by the Roman Senate, marking the beginning of the Roman Empire.',
            '1909 - Ernest Shackleton\'s expedition finds the magnetic South Pole.',
            '1991 - Operation Desert Storm begins as US-led coalition forces begin bombing Iraq in response to its invasion of Kuwait.'
        ],
        '01-17': [
            '1377 - Pope Gregory XI moves the Papacy back to Rome from Avignon.',
            '1773 - Captain James Cook and his crew become the first Europeans to sail below the Antarctic Circle.',
            '1994 - A magnitude 6.7 earthquake strikes Northridge, California, killing 57 people and causing billions in damage.'
        ],
        '01-18': [
            '1535 - Francisco Pizarro founds the city of Lima, Peru.',
            '1871 - Wilhelm I of Prussia is proclaimed the first German Emperor.',
            '2003 - A bushfire kills four people and destroys more than 500 homes in Canberra, Australia.'
        ],
        '01-19': [
            '1520 - Sten Sture the Younger, the Regent of Sweden, is mortally wounded at the Battle of Bogesund and dies on February 3rd.',
            '1809 - Edgar Allan Poe is born in Boston, Massachusetts.',
            '2006 - A methane explosion in a coal mine near Sago, West Virginia, kills twelve miners.'
        ],
        '01-20': [
            '1320 - Duke Wladyslaw I of Poland issues the Diploma of Kutno, a momentous act in the history of Poland and Lithuania, which leads to the Union of Polish and Lithuanian states.',
            '1885 - L.A. Thompson patents the roller coaster.',
            '2017 - Donald Trump is inaugurated as the 45th President of the United States.'
        ],
        '01-21': [
            '1525 - The Swiss Anabaptist Movement is founded when Conrad Grebel, Felix Manz, George Blaurock, and about a dozen others baptize each other in the home of Manz\'s mother in Zürich, breaking a thousand-year tradition of church-state union.',
            '1793 - After being found guilty of treason by the French National Convention, Louis XVI of France is executed by guillotine.',
            '1976 - The first commercial Concorde flight takes off.',
        ],
        '01-22': [
            '1689 - The Convention Parliament declares that the flight to France in 1688 by James II, the last Roman Catholic British monarch, constitutes an abdication.',
            '1901 - Edward VII becomes King after the death of his mother, Queen Victoria.',
            '2002 - Kmart becomes the largest retailer in United States history to file for Chapter 11 bankruptcy protection.'
        ],
        '01-23': [
            '1571 - The Royal Exchange opens in London.',
            '1849 - Elizabeth Blackwell is awarded her M.D. by the Geneva Medical College of Geneva, New York, becoming the United States\' first female doctor.',
            '2002 - "American Taliban" John Walker Lindh returns to the United States in Federal Bureau of Prisons custody.'
        ],
        '01-24': [
            '1848 - California Gold Rush: James W. Marshall finds gold at Sutter\'s Mill near Sacramento.',
            '1935 - The Krueger Brewing Company sells the first canned beer, "Krueger\'s Finest Beer" and "Krueger\'s Cream Ale", in Richmond, Virginia, United States.',
            '1984 - The first Apple Macintosh goes on sale.'
        ],
        '01-25': [
            '1533 - Henry VIII of England secretly marries his second wife Anne Boleyn.',
            '1890 - Nellie Bly completes her round-the-world journey in 72 days.',
            '1995 - A magnitude 7.2 earthquake hits Kobe, Japan, killing over 6,000 people and starting the Great Hanshin earthquake.'
        ],
        '01-26': [
            '1788 - The British First Fleet, led by Arthur Phillip, sails into Port Jackson (Sydney Harbour) to establish Sydney, the first permanent European settlement on the continent.',
            '1838 - Tennessee enacts the first prohibition law in the United States.',
            '2012 - The first wave of protests for the Russian legislative election were held.'
        ],
        '01-27': [
            '1825 - U.S. Congress approves Indian Territory (in what is present-day Oklahoma), clearing the way for forced relocation of the Eastern Indians on the "Trail of Tears".',
            '1880 - Thomas Edison receives a patent for his incandescent lamp.',
            '1944 - World War II: The 900-day Siege of Leningrad is lifted.'
        ],
        '01-28': [
            '1855 - A locomotive on the Panama Canal Railway runs from the Atlantic Ocean to the Pacific Ocean for the first time.',
            '1902 - The Carnegie Institution of Washington is founded in Washington, D.C. with a $10 million gift from Andrew Carnegie.',
            '1986 - The Space Shuttle Challenger disintegrates 73 seconds after launch, killing all seven astronauts on board.'
        ],
        '01-29': [
            '1595 - The Japanese invasions of Korea (1592–1598) end after a truce and Korea\'s withdrawal of its forces from Japan.',
            '1845 - "The Raven" by Edgar Allan Poe is published for the first time in the New York Evening Mirror.',
            '2002 - In his State of the Union address, President George W. Bush describes "regimes that sponsor terror" as an Axis of Evil.'
        ],
        '01-30': [
            '1649 - King Charles I of England is beheaded.',
            '1948 - Mahatma Gandhi is assassinated by Nathuram Godse, a Hindu extremist.',
            '1968 - Vietnam War: The Tet Offensive begins when Viet Cong forces launch a series of surprise attacks in South Vietnam.'
        ],
        '01-31': [
            '1747 - The first venereal diseases clinic opens at London Lock Hospital.',
            '1865 - The United States Congress passes the Thirteenth Amendment to the Constitution of the United States, abolishing slavery, submitting it to the states for ratification.',
            '1950 - President Harry S. Truman announces a program to develop the hydrogen bomb.'
        ],
        '02-01': [
            '1790 - The Supreme Court of the United States convenes for the first time.',
            '1861 - American Civil War: Texas secedes from the United States.',
            '2003 - Space Shuttle Columbia disintegrates during re-entry into the Earth\'s atmosphere, killing all seven astronauts aboard.'
        ],
        '02-02': [
            '1536 - Spaniard Pedro de Mendoza founds Buenos Aires, Argentina.',
            '1653 - New Amsterdam (later renamed The City of New York) is incorporated.',
            '1971 - Idi Amin leads a coup deposing Milton Obote and becomes Uganda\'s president.'
        ],
        '02-03': [
            '1451 - Sultan Mehmed II inherits the throne of the Ottoman Empire.',
            '1870 - The Fifteenth Amendment to the United States Constitution is ratified, guaranteeing voting rights to citizens regardless of race.',
            '2013 - A 6.9 magnitude earthquake strikes the Solomon Islands, killing 10 people and injuring 17 others.'
        ],
        '02-04': [
            '1703 - In Edo (now Tokyo), 46 of the Forty-seven Ronin commit seppuku (ritual suicide) as recompense for avenging their master\'s death.',
            '1789 - George Washington is unanimously elected as the first President of the United States by the U.S. Electoral College.',
            '2004 - Mark Zuckerberg launches Facebook from his Harvard University dormitory room.'
        ],
        '02-05': [
            '1818 - Jean-Baptiste Bernadotte ascends to the thrones of Sweden and Norway as Charles XIV John.',
            '1919 - Charlie Chaplin, Mary Pickford, Douglas Fairbanks, and D.W. Griffith launch United Artists.',
            '2017 - SpaceX conducts its first private rocket launch from the same launch pad that was used by NASA\'s Apollo missions.'
        ],
        '02-06': [
            '1778 - American Revolutionary War: In Paris, the Treaty of Alliance and the Treaty of Amity and Commerce are signed by the United States and France signaling official recognition of the new republic.',
            '1918 - Representation of the People Act gives women in the United Kingdom the right to vote.',
            '2018 - SpaceX successfully conducts its maiden flight of the Falcon Heavy rocket, the most powerful operational rocket in the world by a factor of two.'
        ],
        '02-07': [
            '1497 - The Bonfire of the Vanities occurs in which supporters of Girolamo Savonarola burn thousands of objects such as cosmetics, art, and books in Florence, Italy.',
            '1812 - The strongest in a series of earthquakes strikes New Madrid, Missouri.',
            '2014 - Over 250 people are killed in anti-government protests in Ukraine.'
        ],
        '02-08': [
            '1693 - The College of William & Mary in Williamsburg, Virginia is granted a charter by King William III and Queen Mary II of England.',
            '1837 - Richard Johnson becomes the first Vice President of the United States chosen by the United States Senate.',
            '1952 - Elizabeth II becomes queen regnant of the United Kingdom and the other Commonwealth realms upon the death of her father, George VI.'
        ],
        '02-09': [
            '1555 - Bishop of Gloucester John Hooper is burned at the stake.',
            '1969 - First test flight of the Boeing 747.',
            '2020 - President of the United States Donald Trump is acquitted by the Senate in his impeachment trial.'
        ],
        '02-10': [
            '1763 - French and Indian War: The Treaty of Paris ends the war and France cedes Quebec to Great Britain.',
            '1897 - The Reichstag, the German parliament building in Berlin, is opened.',
            '2009 - At least 113 people are killed and over 200 injured following a series of coordinated bomb explosions in Baghdad, Iraq.'
        ],
        '02-11': [
            '660 BC - Traditional date for the foundation of Japan by Emperor Jimmu.',
            '1971 - Eighty-seven countries, including the United States, United Kingdom, and Soviet Union, sign the Seabed Treaty outlawing nuclear weapons on the ocean floor in international waters.',
            '2011 - The first wave of the Egyptian revolution culminates in the resignation of Hosni Mubarak and the transfer of power to the Supreme Military Council after 18 days of protests.'
        ],
        '02-12': [
            '1502 - Vasco da Gama sets sail from Lisbon, Portugal, on his second voyage to India.',
            '1909 - The National Association for the Advancement of Colored People (NAACP) is founded.',
            '2013 - Pope Benedict XVI announces his resignation, becoming the first pope to do so since Gregory XII in 1415.'
        ],
        '02-13': [
            '1633 - Galileo Galilei arrives in Rome for his trial before the Inquisition.',
            '1920 - The League of Nations recognizes the perpetual neutrality of Switzerland.',
            '2014 - A military transport plane crashes in a mountainous area in Oum El Bouaghi Province, Algeria, killing 77 people.'
        ],
        '02-14': [
            '1779 - James Cook is killed by Native Hawaiians near Kealakekua on the Island of Hawaii.',
            '1912 - Arizona is admitted as the 48th U.S. state.',
            '2018 - Seventeen people are killed and seventeen others are injured in a mass shooting at Marjory Stoneman Douglas High School in Parkland, Florida.'
        ],
        '02-15': [
            '1493 - Pope Alexander VI issues the bull Inter caetera, establishing the Line of Demarcation dividing the New World between Spain and Portugal.',
            '1820 - Susan B. Anthony, American suffragist and civil rights activist, is born.',
            '2013 - A meteor explodes over Russia, injuring 1,500 people as a shock wave blows out windows and rocks buildings.'
        ],
        '02-16': [
            '600 - Pope Gregory the Great decrees saying "God bless You" is the correct response to a sneeze.',
            '1862 - American Civil War: General Ulysses S. Grant captures Fort Donelson, Tennessee.',
            '2016 - North Korea launches Kwangmyŏngsŏng-4 into outer space in defiance of multiple UN Security Council resolutions.'
        ],
        '02-17': [
            '364 - Roman Emperor Jovian dies after a reign of eight months.',
            '1859 - Joshua A. Norton declares himself "Norton I, Emperor of the United States."',
            '2014 - The first round of the Ukrainian presidential election is held.'
        ],
        '02-18': [
            '1861 - With Italian unification almost complete, Victor Emmanuel II of Piedmont, Savoy, and Sardinia assumes the title of King of Italy.',
            '1885 - Adventures of Huckleberry Finn by Mark Twain is published for the first time in the United States.',
            '2014 - The opening ceremony for the Winter Olympics is held in Sochi, Russia.'
        ],
        '02-19': [
            '1674 - England and the Netherlands sign the Treaty of Westminster, ending the Third Anglo-Dutch War. A provision of the agreement transfers the Dutch colony of New Amsterdam to England, and it is renamed New York.',
            '1915 - World War I: The first naval attack on the Dardanelles begins when a strong Anglo-French task force bombards Ottoman artillery along the coast of Gallipoli.',
            '2002 - NASA\'s Mars Odyssey space probe begins to map the surface of Mars using its thermal emission imaging system.'
        ],
        '02-20': [
            '1792 - The Postal Service Act, establishing the United States Post Office Department, is signed by United States President George Washington.',
            '1835 - The New York Sun perpetrates the Great Moon Hoax.',
            '2003 - During a Great White concert in West Warwick, Rhode Island, a pyrotechnics display sets the Station nightclub ablaze, killing 100 and injuring over 200 others.'
        ],
        '02-21': [
            '1437 - James I of Scotland is assassinated by a group of nobles led by Sir Robert Graham.',
            '1848 - Karl Marx and Friedrich Engels publish The Communist Manifesto.',
            '2016 - A magnitude 6.4 earthquake strikes southern Taiwan, killing at least 117 people.'
        ],
        '02-22': [
            '1632 - Galileo\'s Dialogue Concerning the Two Chief World Systems is published.',
            '1909 - The sixteen battleships of the Great White Fleet, led by USS Connecticut, return to the United States after a voyage around the world.',
            '2014 - The closing ceremony of the Winter Olympics is held in Sochi, Russia.'
        ],
        '02-23': [
            '303 - Roman Emperor Diocletian orders the destruction of the Christian church in Nicomedia, beginning eight years of Diocletianic Persecution.',
            '1942 - World War II: Japanese submarines fire artillery shells at the coastline near Santa Barbara, California.',
            '1991 - Gulf War: Ground troops cross the Saudi Arabian border and enter Iraq, thus beginning the ground phase of the war.'
        ],
        '02-24': [
            '1303 - Battle of Roslin, of the First War of Scottish Independence.',
            '1831 - The Treaty of Dancing Rabbit Creek, the first removal treaty in accordance with the Indian Removal Act, is proclaimed. The Choctaws in Mississippi cede land east of the river in exchange for payment and land in the West.',
            '1989 - United Airlines Flight 811, bound for New Zealand from Honolulu, Hawaii, rips open during flight, sucking nine passengers out of the business-class section.'
        ],
        '02-25': [
            '1570 - Pope Pius V excommunicates Queen Elizabeth I of England.',
            '1901 - J.P. Morgan incorporates the United States Steel Corporation.',
            '2013 - A hot air balloon crashes near Luxor, Egypt, killing 19 people.'
        ],
        '02-26': [
            '1616 - Galileo Galilei is formally banned by the Roman Catholic Church from teaching or defending the view that the earth orbits the sun.',
            '1929 - President Calvin Coolidge signs an executive order establishing the Grand Teton National Park in Wyoming.',
            '1995 - The United Kingdom\'s oldest investment banking firm, Barings Bank, collapses after securities broker Nick Leeson loses $1.4 billion by speculating on the Singapore International Monetary Exchange using the bank\'s money.'
        ],
        '02-27': [
            '380 - Christianity becomes the state religion of the Roman Empire under Emperor Theodosius I.',
            '1860 - Abraham Lincoln makes a speech at Cooper Union in the city of New York that is largely responsible for his election to the Presidency.',
            '2010 - An 8.8-magnitude earthquake occurs in Chile, triggering a tsunami that kills at least 525 people.'
        ],
        '02-28': [
            '202 BC - Liu Bang is enthroned as the Emperor of China, beginning four centuries of rule by the Han dynasty.',
            '1844 - A gun on USS Princeton explodes while the boat is on a Potomac River cruise, killing eight people, including two United States Cabinet members.',
            '1993 - Bureau of Alcohol, Tobacco and Firearms agents raid the Branch Davidian compound in Waco, Texas, with a warrant to arrest the group\'s leader David Koresh. Four BATF agents and five Davidians die in the initial raid, starting a 51-day standoff.'
        ],
        '02-29': [
            '1892 - St. Petersburg, Florida, is incorporated as a city.',
            '1916 - Child labor: In South Carolina, the minimum working age for factory, mill, and mine workers is raised from twelve to fourteen years old, although the minimum working age for other jobs remains twelve years old.',
            '2016 - Dozens are killed and 170 injured in a series of earthquakes in the Kyushu region of Japan.'
        ],
        '03-01': [
            '1562 - Twenty-three Huguenots are massacred by Catholics in Wassy, France, marking the start of the French Wars of Religion.',
            '1781 - The Continental Congress adopts the Articles of Confederation.',
            '2013 - 42 people are killed by a series of bombs in Damascus, Syria.'
        ],
        '03-02': [
            '1717 - The Loves of Mars and Venus is the first ballet performed in England.',
            '1962 - Wilt Chamberlain scores 100 points in a single basketball game.',
            '2019 - A tornado outbreak in the southern United States kills 23 people.'
        ],
        '03-03': [
            '1845 - Florida is admitted as the 27th U.S. state.',
            '1924 - The 1400-year-old Islamic caliphate is abolished when Caliph Abdul Mejid II of the Ottoman Empire is deposed. The last remnant of the old regime gives way to the reformed Turkey of Kemal Atatürk.',
            '2014 - Malaysia Airlines Flight 370, carrying a total of 239 people, disappears en route from Kuala Lumpur to Beijing.'
        ],
        '03-04': [
            '1519 - Hernán Cortés arrives in Mexico in search of the Aztec civilization and its wealth.',
            '1675 - John Flamsteed is appointed the first Astronomer Royal of England.',
            '2012 - At least 17 Afghan civilians are killed by a lone rogue U.S. Army soldier in the Kandahar province of Afghanistan.'
        ],
        '03-05': [
            '1496 - King Henry VII of England issues letters patent to John Cabot and his sons, authorizing them to explore unknown lands.',
            '1872 - George Westinghouse patents the air brake.',
            '2013 - A bomb explodes near a mosque in Damascus, Syria, killing at least 53 people and injuring more than 200 others.'
        ],
        '03-06': [
            '1836 - Texas Revolution: Battle of the Alamo: After a thirteen-day siege by an army of 3,000 Mexican troops, the 187 Texas volunteers, including frontiersman Davy Crockett and colonel Jim Bowie, defending the Alamo are killed and the fort is captured.',
            '1921 - Portuguese Communist Party is founded as the Portuguese Section of the Communist International.',
            '2019 - The U.S. House of Representatives votes to condemn bigotry, including anti-Semitism and Islamophobia, in response to remarks made by Congresswoman Ilhan Omar.'
        ],
        '03-07': [
            '1876 - Alexander Graham Bell is granted a patent for an invention he calls the "telephone".',
            '1965 - Bloody Sunday: A group of 600 civil rights marchers are brutally attacked by state and local police in Selma, Alabama.',
            '2009 - The Kepler space observatory, designed to discover Earth-like planets orbiting other stars, is launched by NASA.'
        ],
        '03-08': [
            '1618 - Johannes Kepler discovers the third law of planetary motion.',
            '1702 - Anne Stuart, sister of Mary Stuart, becomes Queen Anne of England, Scotland, and Ireland.',
            '2014 - Malaysia Airlines Flight 370, carrying a total of 239 people, disappears en route from Kuala Lumpur to Beijing.'
        ],
        '03-09': [
            '1842 - Giuseppe Verdi\'s third opera, Nabucco, receives its première performance in Milan.',
            '1916 - Pancho Villa leads nearly 500 Mexican raiders in an attack against the border town of Columbus, New Mexico.',
            '2011 - Space Shuttle Discovery makes its final landing after 39 flights.'
        ],
        '03-10': [
            '1804 - Louisiana Purchase: In St. Louis, Missouri, a formal ceremony is conducted to transfer ownership of the Louisiana Territory from France to the United States.',
            '1876 - Alexander Graham Bell makes the first successful telephone call by saying "Mr. Watson, come here, I want to see you."',
            '2017 - Forty-one people are killed and over 90 injured in a series of bombings in Damascus, Syria.'
        ],
        '03-11': [
            '1811 - During André Masséna\'s retreat from the Lines of Torres Vedras, a division led by French Marshal Michel Ney fights off a combined Anglo-Portuguese force to give Masséna time to escape.',
            '1872 - Construction of the Seven Sisters Colliery, South Wales, begins; located on one of the richest coal sources in Britain.',
            '2011 - A magnitude 9.0 earthquake and subsequent tsunami hit the east of Japan, killing 15,840 and leaving another 3,926 missing.'
        ],
        '03-12': [
            '1864 - American Civil War: The Red River Campaign begins as a U.S. Navy fleet of 13 Ironclads and 7 Gunboats and other support ships enter the Red River.',
            '1918 - Moscow becomes the capital of Russia again after Saint Petersburg held this status for 215 years.',
            '2011 - A reactor at the Fukushima Daiichi Nuclear Power Plant melts and explodes and releases radioactivity into the atmosphere a day after Japan\'s earthquake.'
        ],
        '03-13': [
            '624 - Battle of Badr: A key battle between Muhammad\'s army and the Quraish of Mecca in the early days of Islam.',
            '1781 - William Herschel discovers Uranus.',
            '2013 - Pope Francis is elected, in the papal conclave, as the 266th Pope of the Catholic Church.'
        ],
        '03-14': [
            '1489 - The Queen of Cyprus, Catherine Cornaro, sells her kingdom to Venice.',
            '1900 - The Gold Standard Act is ratified, placing United States currency on the gold standard.',
            '2011 - The Syrian Civil War begins as the Assad government launches a crackdown on pro-democracy protests.'
        ],
        '03-15': [
            '44 BC - Julius Caesar is assassinated by Roman senators led by Marcus Junius Brutus.',
            '1965 - President Lyndon B. Johnson, responding to the Selma crisis, tells U.S. Congress "We shall overcome" while advocating the Voting Rights Act.',
            '2019 - 51 people are killed and 50 others are injured in two consecutive terrorist attacks at mosques in Christchurch, New Zealand.'
        ],
        '03-16': [
            '1621 - Samoset, a Mohegan, visits the settlers of Plymouth Colony and greets them, "Welcome, Englishmen! My name is Samoset."',
            '1802 - The United States Military Academy (West Point) is established.',
            '2014 - Crimea votes in a controversial referendum to join Russia.'
        ],
        '03-17': [
            '1861 - The Kingdom of Italy is proclaimed.',
            '1941 - In Washington, D.C., the National Gallery of Art is officially opened by President Franklin D. Roosevelt.',
            '2019 - Cyclone Idai makes landfall in Mozambique, causing severe flooding and the deaths of more than 1,000 people across Mozambique, Zimbabwe, and Malawi.'
        ],
        '03-18': [
            '1922 - Mohandas Gandhi is sentenced to six years in prison for civil disobedience against the British Raj in India.',
            '1965 - Cosmonaut Alexei Leonov, leaving his spacecraft Voskhod 2 for 12 minutes, becomes the first person to walk in space.',
            '2018 - 23 Russian diplomats are expelled from the United Kingdom in response to the poisoning of Sergei and Yulia Skripal with a nerve agent in Salisbury.'
        ],
        '03-19': [
            '1687 - Explorer Robert Cavelier de La Salle, searching for the mouth of the Mississippi River, is murdered by his own men.',
            '1918 - The U.S. Congress establishes time zones and approves daylight saving time.',
            '2018 - Egypt holds its presidential election, with President Abdel Fattah el-Sisi winning a second term in office.'
        ],
        '03-20': [
            '1854 - The Republican Party of the United States is founded in Ripon, Wisconsin.',
            '1923 - The Arts Club of Chicago hosts the opening of Pablo Picasso\'s first United States showing, entitled Original Drawings by Pablo Picasso, becoming an early proponent of modern art in the United States.',
            '2019 - Special Counsel Robert Mueller delivers his report on alleged collusion between Russia and President Donald Trump\'s 2016 campaign to the United States Department of Justice.'
        ],
        '03-21': [
            '1556 - Archbishop of Canterbury Thomas Cranmer is executed for treason.',
            '1963 - Alcatraz Federal Penitentiary in San Francisco Bay closes.',
            '2014 - The United Nations General Assembly passes a resolution condemning Russia\'s annexation of Crimea.'
        ],
        '03-22': [
            '1622 - Jamestown massacre: Algonquian Indians kill 347 English settlers around Jamestown, Virginia, a third of the colony\'s population.',
            '1954 - The London Agreement on German external debts is signed.',
            '2016 - Three suicide bombers kill 32 people and injure 316 others in the 2016 Brussels bombings at the airport and at the Maelbeek/Maalbeek metro station.'
        ],
        '03-23': [
            '1775 - American Revolutionary War: Patrick Henry delivers his speech – "Give me liberty, or give me death!" – at St. John\'s Episcopal Church, Richmond, Virginia.',
            '1983 - Strategic Defense Initiative: President Ronald Reagan makes his initial proposal to develop technology to intercept enemy missiles.',
            '2019 - Hundreds of thousands of people participate in the "March of Return" along the Israel–Gaza border, leading to deadly clashes with Israeli forces.'
        ],
        '03-24': [
            '1832 - In Hiram, Ohio, a group of men beat, tar, and feather Mormon leader Joseph Smith.',
            '1958 - Rock \'n\' roll teen idol Elvis Presley is drafted in the U.S. Army.',
            '2015 - A Germanwings Airbus A320 crashes in the French Alps, killing all 150 people on board.'
        ],
        '03-25': [
            '1584 - Sir Walter Raleigh is granted a patent to colonize Virginia.',
            '1911 - In New York City, the Triangle Shirtwaist Factory fire kills 146 garment workers.',
            '2018 - The Chinese space station Tiangong-1 disintegrates over the southern Pacific Ocean after reentering Earth\'s atmosphere.'
        ],
        '03-26': [
            '1484 - William Caxton prints his translation of Aesop\'s Fables.',
            '1979 - Anwar al-Sadat, Menachem Begin, and Jimmy Carter sign the Egypt–Israel Peace Treaty in Washington, D.C.',
            '2019 - The European Union votes to abolish daylight saving time from 2021 onwards.'
        ],
        '03-27': [
            '1309 - Pope Clement V excommunicates Venice and all its population.',
            '1964 - The Good Friday earthquake, the most powerful earthquake in U.S. history, strikes Alaska, killing 125 people and inflicting massive damage to the city of Anchorage.',
            '2014 - The United Nations General Assembly passes a resolution condemning Russia\'s annexation of Crimea.'
        ],
        '03-28': [
            '845 - Paris is sacked by Viking raiders, probably under Ragnar Lodbrok, who collects a huge ransom in exchange for leaving.',
            '1969 - Greek poet and Nobel Prize laureate Giorgos Seferis makes a statement on BBC Radio, calling for resistance against the dictatorship in Greece.',
            '2017 - The United States Senate votes to overturn Internet privacy rules created by the FCC during the Obama administration.'
        ],
        '03-29': [
            '1461 - During the Wars of the Roses, Yorkists led by Edward IV defeat Lancastrians under King Henry VI at the Battle of Towton; about 28,000 die in Britain\'s largest battle.',
            '1974 - Terra nullius: Jack McConnell successfully claims ownership of the Northern Territory of Australia under the Crown Lands Act 1929.',
            '2019 - NASA cancels the first all-female spacewalk due to a shortage of appropriately sized space suits.'
        ],
        '03-30': [
            '1282 - The people of Sicily rebel against the Angevin King Charles I, in what becomes known as the Sicilian Vespers.',
            '1981 - U.S. President Ronald Reagan is shot in the chest outside a Washington, D.C., hotel by John Hinckley Jr.; three others are wounded in the same incident.',
            '2018 - The U.S. Senate confirms John R. Bolton as the 27th United States national security advisor.'
        ],
        '03-31': [
            '1492 - Queen Isabella of Castile issues the Alhambra Decree, ordering her 150,000 Jewish and Muslim subjects to convert to Christianity or face expulsion.',
            '1889 - The Eiffel Tower is officially opened to the public at the Universal Exposition in Paris.',
            '2016 - The United States Air Force completes the first successful test flight of the Boeing X-37B, a reusable unmanned spacecraft.'
        ],
        '04-01': [
            '1789 - In New York City, the United States House of Representatives achieves its first quorum and elects Frederick Muhlenberg of Pennsylvania as its first Speaker.',
            '1976 - Apple Inc. is formed by Steve Jobs, Steve Wozniak, and Ronald Wayne in Cupertino, California.',
            '2018 - A gunman opens fire at YouTube headquarters in San Bruno, California, injuring three people before killing herself.'
        ],
        '04-02': [
            '1513 - Spanish explorer Juan Ponce de León first sights land in what is now Florida.',
            '1792 - The Coinage Act is passed establishing the United States Mint.',
            '2015 - Gunmen attack Garissa University College in Kenya, killing at least 147 people and injuring 79 others.'
        ],
        '04-03': [
            '1043 - Edward the Confessor is crowned King of England.',
            '1948 - U.S. President Harry S. Truman signs the Marshall Plan, authorizing $5 billion in aid for 16 countries.',
            '2010 - The Apple iPad goes on sale in the United States.'
        ],
        '04-04': [
            '1581 - Francis Drake is knighted for completing a circumnavigation of the world.',
            '1841 - William Henry Harrison dies of pneumonia, becoming the first President of the United States to die in office and setting the record for the briefest administration.',
            '2018 - Martin Luther King Jr.\'s assassination 50 years ago leads to a call for worldwide protests against racism and poverty.'
        ],
        '04-05': [
            '1614 - In Virginia, Native American Pocahontas marries English colonist John Rolfe.',
            '1792 - U.S. President George Washington exercises his authority to veto a bill, the first time this power is used in the United States.',
            '2010 - Twenty-nine coal miners are killed in an explosion at the Upper Big Branch Mine in West Virginia.'
        ],
        '04-06': [
            '1814 - Napoleon abdicates for the first time and names his son Napoleon II as Emperor of the French.',
            '1896 - The first modern Olympic Games are held in Athens, Greece, with athletes from 14 countries participating in 43 events.',
            '2018 - Hungarian Prime Minister Viktor Orbán wins a third consecutive term, securing a supermajority in Parliament.'
        ],
        '04-07': [
            '529 - First draft of the Corpus Juris Civilis (a fundamental work in jurisprudence) is issued by Eastern Roman Emperor Justinian I.',
            '1927 - First long-distance public television broadcast (from Washington, D.C., to New York City, displaying the image of Commerce Secretary Herbert Hoover).',
            '2017 - A chemical attack on Khan Shaykhun in Syria kills at least 86 people and injures more than 500 others.'
        ],
        '04-08': [
            '1139 - Roger II of Sicily is excommunicated.',
            '1952 - U.S. President Harry Truman calls for the seizure of all domestic steel mills to prevent a nationwide strike.',
            '2019 - Wikileaks co-founder Julian Assange is arrested at the Ecuadorian embassy in London, after nearly seven years inside the embassy.'
        ],
        '04-09': [
            '1413 - Henry V becomes King of England.',
            '1865 - American Civil War: Robert E. Lee surrenders the Army of Northern Virginia (26,765 troops) to Ulysses S. Grant at Appomattox Court House, Virginia, effectively ending the war.',
            '2017 - A bomb explodes on a St. Petersburg metro train, killing 15 people and injuring 87 others.'
        ],
        '04-10': [
            '837 - Halley\'s Comet makes its closest approach to Earth at a distance equal to 0.0342 AU (5.1 million kilometers/3.2 million miles).',
            '1919 - Mexican Revolution leader Emiliano Zapata is ambushed and shot to death in Morelos by government forces.',
            '2019 - Scientists reveal the first image of a black hole, located in the center of the Messier 87 galaxy.'
        ],
        '04-11': [
            '1689 - William III and Mary II are crowned as joint sovereigns of Great Britain.',
            '1970 - Apollo 13 is launched on the third crewed mission to the Moon. The mission is aborted after an oxygen tank explodes but the crew returns safely.',
            '2017 - An explosion on a metro train in Saint Petersburg, Russia, kills 16 people and injures 103 others.'
        ],
        '04-12': [
            '1606 - The Union Flag is adopted as the flag of English and Scottish ships.',
            '1861 - American Civil War: The war begins with Confederate forces firing on Fort Sumter, in the harbor of Charleston, South Carolina.',
            '2015 - A magnitude 7.8 earthquake strikes Nepal, killing more than 8,000 people and injuring more than 21,000 others.'
        ],
        '04-13': [
            '1204 - The Crusaders of the Fourth Crusade breach the walls of Constantinople and enter the city, which they completely occupy the following day.',
            '1742 - Handel\'s oratorio Messiah makes its world-premiere in Dublin, Ireland.',
            '2014 - A South Korean ferry capsizes in the Yellow Sea, killing 304 passengers and crewmembers aboard.'
        ],
        '04-14': [
            '1561 - The city of Nuremberg experiences a mass sighting of unidentified flying objects.',
            '1865 - U.S. President Abraham Lincoln is shot in Ford\'s Theatre by John Wilkes Booth; he dies a day later.',
            '2014 - Boko Haram militants abduct 276 female students from a school in Chibok, Nigeria.'
        ],
        '04-15': [
            '1450 - Battle of Formigny: Toward the end of the Hundred Years\' War, the French attack and nearly annihilate English forces, ending English domination in Northern France.',
            '1912 - The British passenger liner RMS Titanic sinks in the North Atlantic at 2:20 a.m., two hours and forty minutes after hitting an iceberg. Only 710 of 2,227 passengers and crew survive.',
            '2019 - A major fire breaks out at the Notre-Dame Cathedral in Paris, causing significant damage to the structure and destroying its spire.'
        ],
        '04-16': [
            '1178 - A supernova is observed by Chinese, Japanese, Korean, and Arab astronomers and described in the astronomical section of the Chinese Book of Song.',
            '1943 - Albert Hofmann deliberately doses himself with LSD for the first time, taking 250 micrograms (an actual threshold dose is about 20 micrograms) and rides home on a bicycle, a situation that later was transformed into a famous image and myth.',
            '2014 - The MV Sewol ferry sinks off the coast of South Korea, with 304 passengers and crew dead and 174 rescued.'
        ],
        '04-17': [
            '1492 - Spain and Christopher Columbus sign the Capitulations of Santa Fe for his voyage to Asia to acquire spices.',
            '1961 - Bay of Pigs Invasion: A group of Cuban exiles financed and trained by the CIA lands at the Bay of Pigs in Cuba with the aim of ousting Fidel Castro.',
            '2019 - A fire breaks out at the Notre-Dame Cathedral in Paris, causing significant damage to the structure.'
        ],
        '04-18': [
            '1775 - American Revolutionary War: The British advancement by sea begins; Paul Revere and other riders warn the countryside of the troop movements.',
            '1906 - An earthquake and fire destroy much of San Francisco, California.',
            '2014 - More than 200 girls are abducted from a school in Chibok, Nigeria by Boko Haram militants.'
        ],
        '04-19': [
            '1770 - Captain James Cook arrives in New Zealand, becoming the first European to reach the islands since Abel Tasman.',
            '1897 - The Greco-Turkish War is declared between Greece and the Ottoman Empire.',
            '2017 - U.S. President Donald Trump orders a military strike on a Syrian government airbase in response to the Khan Shaykhun chemical attack.'
        ],
        '04-20': [
            '1657 - English Admiral Robert Blake fights his last battle when he destroys the Spanish fleet in Santa Cruz Bay.',
            '1999 - Columbine High School massacre: Eric Harris and Dylan Klebold kill 13 people and injure 21 others before committing suicide at Columbine High School in Columbine, Colorado.',
            '2010 - The Deepwater Horizon drilling rig explodes in the Gulf of Mexico, killing 11 workers and beginning an oil spill that would last six months.'
        ],
        '04-21': [
            '1782 - Spanish General José de Bustamante ends the siege of Pensacola, Florida, by the British.',
            '1989 - Tiananmen Square protests of 1989: In Beijing, around 100,000 students gather in Tiananmen Square to commemorate Chinese reform leader Hu Yaobang.',
            '2019 - A series of bombings targeting churches and hotels in Sri Lanka kills at least 259 people and injures more than 500 others.'
        ],
        '04-22': [
            '1500 - Portuguese navigator Pedro Álvares Cabral lands in Brazil.',
            '1864 - The U.S. Congress passes the Coinage Act of 1864 that mandates that the inscription In God We Trust be placed on all coins minted as United States currency.',
            '2016 - More than 300 are killed and hundreds are injured in a bombing in the Yarmouk refugee camp in Syria.'
        ],
        '04-23': [
            '1348 - The first English order of knighthood, the Order of the Garter, is founded by King Edward III.',
            '1910 - American President Theodore Roosevelt delivers his "Man in the Arena" speech.',
            '2016 - More than 200 are killed and hundreds are injured in a bombing in the Karrada district of Baghdad, Iraq.'
        ],
        '04-24': [
            '1704 - The first regular newspaper in British Colonial America, The Boston News-Letter, is published.',
            '1915 - The arrest of 250 Armenian intellectuals and community leaders in Istanbul marks the beginning of the Armenian Genocide.',
            '2013 - A building collapses near Dhaka, Bangladesh, killing more than 1,100 people and injuring thousands in one of the deadliest industrial disasters in history.'
        ],
        '04-25': [
            '1792 - Highwayman Nicolas J. Pelletier becomes the first person executed by guillotine.',
            '1953 - Francis Crick and James D. Watson publish "Molecular Structure of Nucleic Acids: A Structure for Deoxyribose Nucleic Acid", describing the double helix structure of DNA.',
            '2015 - A magnitude 7.8 earthquake strikes Nepal, killing more than 8,000 people and injuring more than 21,000 others.'
        ],
        '04-26': [
            '1336 - Francesco Petrarca (Petrarch) ascends Mont Ventoux.',
            '1986 - A nuclear reactor accident occurs at the Chernobyl Nuclear Power Plant in the Soviet Union (now Ukraine), creating the world\'s worst nuclear disaster.',
            '2015 - A magnitude 7.8 earthquake strikes Nepal, killing more than 8,000 people and injuring more than 21,000 others.'
        ],
        '04-27': [
            '4977 BC - The Universe is created, according to Kepler.',
            '1953 - Operation Moolah offers $50,000 to any pilot who defected with a fully mission-capable Mikoyan-Gurevich MiG-15 to South Korea.',
            '2011 - The European Union bans the use of naked-body scanners at all European airports.'
        ],
        '04-28': [
            '1789 - Mutiny on the Bounty: Lieutenant William Bligh and 18 sailors are set adrift and the rebel crew returns to Tahiti briefly and then sets sail for Pitcairn Island.',
            '1945 - Benito Mussolini and his mistress Clara Petacci are executed by a firing squad consisting of members of the Italian resistance movement.',
            '2015 - The deadliest earthquake in Nepal\'s history strikes with a magnitude of 7.8, killing over 8,000 people.'
        ],
        '04-29': [
            '1429 - Joan of Arc arrives to relieve the Siege of Orléans.',
            '1945 - Adolf Hitler marries his longtime partner Eva Braun in a Berlin bunker and designates Admiral Karl Dönitz as his successor.',
            '2017 - NASA\'s Cassini spacecraft dives between Saturn and its innermost ring, beginning its Grand Finale orbit phase.'
        ],
        '04-30': [
            '311 - Diocletian dedicates a tetrarchy monument.',
            '1789 - On the balcony of Federal Hall on Wall Street in New York City, George Washington takes the oath of office to become the first elected President of the United States.',
            '2019 - Emperor Akihito abdicates the Japanese throne, the first Japanese monarch to do so in over two centuries.'
        ],
        '05-01': [
            '1328 - Wars of Scottish Independence end: By the Treaty of Edinburgh–Northampton the Kingdom of England recognizes the Kingdom of Scotland as an independent state.',
            '1945 - World War II: A German newsreader officially announces that Adolf Hitler has "fallen at his command post in the Reich Chancellery fighting to the last breath against Bolshevism and for Germany".',
            '2011 - Pope John Paul II is beatified by his successor, Pope Benedict XVI.'
        ],
        '05-02': [
            '1611 - The King James Version of the Bible is published for the first time in London, England, by printer Robert Barker.',
            '1964 - Vietnam War: An explosion sinks the USS Card while docked at Saigon, South Vietnam, killing 23 U.S. Navy personnel. Her captain, Lieutenant Commander George S. Morrison, father of rock star Jim Morrison, is not among the victims.',
            '2011 - Osama bin Laden, the suspected mastermind behind the September 11 attacks and the FBI\'s most wanted man, is killed by the United States special forces in Abbottabad, Pakistan.'
        ],
        '05-03': [
            '1469 - Niccolò Machiavelli, Italian historian, philosopher, and author of The Prince, is born.',
            '1921 - West Virginia becomes the first state to legislate a broad sales tax, but does not implement it until a number of years later due to enforcement issues.',
            '2015 - Two gunmen open fire at the Curtis Culwell Center in Garland, Texas, which was hosting an event featuring cartoon images of Muhammad, and are killed by police officers.'
        ],
        '05-04': [
            '1776 - Rhode Island becomes the first American colony to renounce allegiance to King George III.',
            '1886 - Haymarket affair: A bomb is thrown at policemen trying to break up a labor rally in Chicago, United States, leading to violence and the deaths of seven policemen and at least four civilians.',
            '2019 - Cyclone Fani makes landfall in Odisha, India, affecting millions and causing significant damage and at least 89 deaths.'
        ],
        '05-05': [
            '1494 - Christopher Columbus lands on the island of Jamaica and claims it for Spain.',
            '1961 - Alan Shepard becomes the first American to travel into space aboard Freedom 7.',
            '2019 - King Maha Vajiralongkorn of Thailand marries his bodyguard in a surprise ceremony, making her his fourth wife.'
        ],
        '05-06': [
            '1527 - Spanish and German troops sack Rome; some consider this the end of the Renaissance.',
            '1935 - New Deal: Executive Order 7034 creates the Works Progress Administration (WPA) in the United States.',
            '2019 - A small plane crashes into a FedEx distribution center in Ewing Township, New Jersey, killing the pilot but causing no other casualties.'
        ],
        '05-07': [
            '1664 - Louis XIV of France begins construction of the Palace of Versailles.',
            '1915 - World War I: German submarine U-20 sinks RMS Lusitania, killing 1,198 people, including 128 Americans. Public reaction to the sinking turns many formerly pro-Germans in the United States against the German Empire.',
            '2019 - Following weeks of civil unrest, Sudanese president Omar al-Bashir is ousted in a military coup after 30 years in power.'
        ],
        '05-08': [
            '1450 - Jack Cade\'s Rebellion: Kentishmen revolt against King Henry VI.',
            '1945 - World War II: V-E Day, combat ends in Europe. German forces agree to an unconditional surrender.',
            '2019 - Papua New Guinea Prime Minister Peter O\'Neill resigns from office following weeks of political unrest.'
        ],
        '05-09': [
            '1671 - Thomas Blood, disguised as a clergyman, attempts to steal England\'s Crown Jewels from the Tower of London.',
            '1946 - King Victor Emmanuel III of Italy abdicates and is succeeded by Umberto II.',
            '2018 - The President of Armenia, Armen Sarkissian, appoints opposition leader Nikol Pashinyan as Prime Minister after weeks of protests against corruption and cronyism.'
        ],
        '05-10': [
            '1774 - Louis XVI and Marie Antoinette become King and Queen of France.',
            '1869 - The First Transcontinental Railroad, linking the eastern and western United States, is completed at Promontory Summit, Utah with the golden spike.',
            '2018 - After nearly three decades in power, Mahathir Mohamad is sworn in as the Prime Minister of Malaysia, becoming the world\'s oldest sitting state leader.'
        ],
        '05-11': [
            '868 - A copy of the Diamond Sutra is printed in China, making it the oldest known dated printed book.',
            '1997 - Deep Blue, a chess-playing supercomputer, defeats Garry Kasparov in the last game of the rematch, becoming the first computer to beat a world-champion chess player in a classic match format.',
            '2019 - The American state of Georgia signs into law the "heartbeat bill", effectively banning abortions after a fetal heartbeat is detected.'
        ],
        '05-12': [
            '1551 - National University of San Marcos, the oldest university in the Americas, is founded in Lima, Peru.',
            '1932 - Ten weeks after his abduction, the infant son of Charles Lindbergh is found dead in Hopewell, New Jersey, just a few miles from the Lindberghs\' home.',
            '2015 - A series of coordinated bombings at Shia mosques in the Yemeni capital, Sana\'a, kills at least 137 people and injures hundreds.'
        ],
        '05-13': [
            '1373 - Julian of Norwich has visions which are later transcribed in her Revelations of Divine Love.',
            '1981 - Mehmet Ali Ağca attempts to assassinate Pope John Paul II in St. Peter\'s Square in Rome.',
            '2019 - More than 20 are killed and dozens injured in two attacks targeting Shia Muslims in Pakistan, including a suicide bombing at a mosque in Quetta.'
        ],
        '05-14': [
            '1509 - Battle of Agnadello: In northern Italy, French forces defeat the Venetians.',
            '1607 - Jamestown, Virginia is settled as a British colony.',
            '2018 - The United States moves its embassy in Israel from Tel Aviv to Jerusalem, sparking protests and violence along the Gaza border.'
        ],
        '05-15': [
            '1536 - Anne Boleyn, Queen of England, is arrested and imprisoned on charges of adultery, incest, treason and witchcraft.',
            '1858 - Opening of the present Royal Opera House in Covent Garden, London.',
            '2019 - The International Swimming Federation announces that it will ban the use of tech suits, high-performance swimsuits made of polyurethane or other non-textile materials, starting in 2020.'
        ],
        '05-16': [
            '1770 - The 14-year-old Marie Antoinette marries 15-year-old Louis-Auguste, who later becomes king of France.',
            '1929 - In Hollywood, the first Academy Awards are awarded.',
            '2019 - Indonesia announces plans to move its capital from Jakarta to Borneo due to overpopulation, pollution, traffic congestion, and climate change.'
        ],
        '05-17': [
            '1536 - George Boleyn, Viscount Rochford and four other men are executed for treason.',
            '1954 - The United States Supreme Court hands down a unanimous decision in Brown v. Board of Education of Topeka, Kansas.',
            '2019 - Taiwan becomes the first country in Asia to legalize same-sex marriage.'
        ],
        '05-18': [
            '1860 - Abraham Lincoln wins the Republican Party presidential nomination over William H. Seward, who later becomes the United States Secretary of State.',
            '1896 - The United States Supreme Court rules in Plessy v. Ferguson that the "separate but equal" doctrine is constitutional.',
            '2018 - The wedding of Prince Harry and Meghan Markle takes place at St George\'s Chapel, Windsor.'
        ],
        '05-19': [
            '1536 - Anne Boleyn, the second wife of Henry VIII of England, is beheaded for adultery, treason, and incest.',
            '1962 - A birthday salute to U.S. President John F. Kennedy takes place at Madison Square Garden, New York City. The highlight is Marilyn Monroe\'s rendition of "Happy Birthday".',
            '2012 - An explosion at a coal mine in the western Turkish town of Soma kills 301 miners and traps up to 201 more.'
        ],
        '05-20': [
            '1217 - The Second Battle of Lincoln is fought near Lincoln, England, resulting in the defeat of Prince Louis of France by William Marshal, 1st Earl of Pembroke.',
            '1927 - Charles Lindbergh takes off from Roosevelt Field in Long Island, New York, on the world\'s first solo non-stop flight across the Atlantic Ocean, touching down at Le Bourget Field in Paris the next day.',
            '2013 - A tornado outbreak occurs in North Texas, resulting in six deaths, dozens of injuries, and widespread damage.'
        ],
        '05-21': [
            '878 - Syracuse, Sicily, is captured by the Muslim Aghlabids after a nine-month siege.',
            '1881 - The American Red Cross is established by Clara Barton in Washington, D.C.',
            '2019 - The Solomon Islands government cuts official ties with Taiwan in favor of establishing diplomatic relations with China.'
        ],
        '05-22': [
            '853 - A Byzantine fleet sacks and destroys undefended Damietta in Egypt.',
            '1960 - An earthquake measuring 9.5 on the moment magnitude scale, the most powerful earthquake ever recorded, strikes Valdivia, Chile, killing 1,000 to 6,000 people.',
            '2017 - An Islamic State suicide bomber kills 22 people and injures 139 others at an Ariana Grande concert in Manchester, England.'
        ],
        '05-23': [
            '1430 - Siege of Compiègne: Joan of Arc is captured by the Burgundians while leading an army to relieve Compiègne.',
            '1934 - American bank robbers Bonnie and Clyde are ambushed and killed by police in Bienville Parish, Louisiana.',
            '2017 - An Islamic State suicide bomber kills at least 22 people and injures 59 others at an Ariana Grande concert in Manchester, England.'
        ],
        '05-24': [
            '1595 - Nomenclator of Leiden University Library appears, the first printed catalog of an institutional library.',
            '1883 - The Brooklyn Bridge in New York City is opened to traffic after 14 years of construction.',
            '2019 - The Australian federal election results in a surprise victory for Prime Minister Scott Morrison and the Liberal-National Coalition.'
        ],
        '05-25': [
            '1803 - Ralph Waldo Emerson, American essayist, lecturer, and poet, is born in Boston, Massachusetts.',
            '1961 - Apollo program: President John F. Kennedy announces before a special joint session of Congress his goal to initiate a project to put a "man on the Moon" before the end of the decade.',
            '2018 - The General Data Protection Regulation (GDPR) goes into effect in the European Union, establishing new rules for the protection of personal data.'
        ],
        '05-26': [
            '1538 - Geneva expels John Calvin and his followers from the city. Calvin lives in exile in Strasbourg for the next three years.',
            '1897 - Bram Stoker\'s novel Dracula goes on sale in London.',
            '2019 - At least 20 people are killed and more than 40 others are injured in a series of bombings targeting churches and hotels in Sri Lanka.'
        ],
        '05-27': [
            '927 - Battle of the Bosnian Highlands: Croatian army, led by King Tomislav, defeats the Bulgarian army, led by Tsar Simeon I.',
            '1937 - In California, the Golden Gate Bridge opens to pedestrian traffic, creating a vital link between San Francisco and Marin County.',
            '2016 - Gorilla Harambe is shot and killed after a child falls into his enclosure at the Cincinnati Zoo and Botanical Garden.'
        ],
        '05-28': [
            '1588 - The Spanish Armada, with 130 ships and 30,000 men, sets sail from Lisbon, bound for the English Channel. (It will take until May 30 for all ships to leave port.)',
            '1830 - U.S. President Andrew Jackson signs the Indian Removal Act into law, authorizing the forced relocation of Native Americans to Indian Territory.',
            '2019 - Prime Minister Narendra Modi and his Bharatiya Janata Party win a landslide victory in the Indian general elections.'
        ],
        '05-29': [
            '1660 - English Restoration: Charles II is restored to the throne of England, Scotland, and Ireland.',
            '1913 - Igor Stravinsky\'s ballet score The Rite of Spring receives its premiere performance in Paris, provoking a riot.',
            '2014 - A series of bombings across Syria, including a car bomb and mortar shells, kill at least 74 people and injure more than 120 others.'
        ],
        '05-30': [
            '1536 - King Henry VIII of England marries Jane Seymour, a lady-in-waiting to his first two wives.',
            '1922 - In Washington, D.C., the Lincoln Memorial is dedicated.',
            '2019 - Thousands of students and workers strike in Hong Kong against a proposed law that would allow extraditions to mainland China.'
        ],
        '05-31': [
            '1279 - BC Ramesses II (The Great) (19th dynasty) becomes pharaoh of Ancient Egypt.',
            '1910 - The creation of the Union of South Africa.',
            '2019 - Fifteen people are killed and 11 others are injured when a bus carrying 32 tourists crashes in eastern Cuba.'
        ],
        '06-01': [
            '1495 - A monk, John Cor, records the first known batch of Scotch whisky.',
            '1967 - The Beatles release Sgt. Pepper\'s Lonely Hearts Club Band.',
            '2019 - Spain\'s ruling Socialist Workers\' Party wins the most seats in the country\'s general election, but falls short of a majority.'
        ],
        '06-02': [
            '455 - Sack of Rome: Vandals enter Rome, and plunder the city for two weeks.',
            '1953 - Elizabeth II is crowned Queen of the United Kingdom at Westminster Abbey, London, England.',
            '2014 - The al-Qaeda splinter group Islamic State of Iraq and the Levant (ISIL) declares itself a caliphate.'
        ],
        '06-03': [
            '1608 - Samuel de Champlain completes his third voyage to New France at Tadoussac, Quebec.',
            '1963 - John F. Kennedy addresses Americans from the Oval Office proposing the Civil Rights Act of 1964 that would revolutionize American society.',
            '2019 - A mass shooting takes place at a shopping center in Virginia Beach, Virginia, killing 12 people and injuring several others.'
        ],
        '06-04': [
            '1039 - Henry III becomes Holy Roman Emperor.',
            '1940 - World War II: The Dunkirk evacuation ends – British forces complete evacuation of 338,000 troops from Dunkirk in France.',
            '2017 - A terrorist attack occurs on London Bridge and in Borough Market, London, killing eight people and injuring 48 others.'
        ],
        '06-05': [
            '1661 - Isaac Newton admitted as a student to Trinity College, Cambridge.',
            '1967 - Six-Day War: Israel captures the Golan Heights from Syria.',
            '2012 - A transit of Venus occurs, the last such phenomenon until 2117.'
        ],
        '06-06': [
            '1508 - Maximilian I, Holy Roman Emperor, is defeated in Friulia by Venetian troops.',
            '1944 - World War II: Battle of Normandy begins. D-Day, code named Operation Overlord, commences with the landing of 155,000 Allied troops on the beaches of Normandy in France.',
            '2019 - A mass shooting occurs at a municipal building in Virginia Beach, Virginia, killing 12 people and injuring several others.'
        ],
        '06-07': [
            '1628 - The Petition of Right, a major English constitutional document, is granted the Royal Assent by Charles I and becomes law.',
            '1981 - Israeli Air Force F-16 fighter jets bomb the Osirak nuclear reactor in Iraq, leading to the destruction of the reactor and the deaths of 10 Iraqi soldiers and one French researcher.',
            '2017 - Over 120 nations gather at the United Nations in New York City to negotiate the terms of the Treaty on the Prohibition of Nuclear Weapons.'
        ],
        '06-08': [
            '1042 - Edward the Confessor becomes King of England, one of the last Anglo-Saxon kings of England.',
            '1948 - The "Papal Coronation" of Pope Pius XII takes place.',
            '2017 - British Prime Minister Theresa May loses her parliamentary majority in a snap general election.'
        ],
        '06-09': [
            '1534 - Jacques Cartier is the first European to discover the Saint Lawrence River.',
            '1973 - Secretariat wins the Belmont Stakes, becoming the first Triple Crown winner since Citation in 1948.',
            '2017 - Colombia becomes the 37th member of the OECD.'
        ],
        '06-10': [
            '1692 - Bridget Bishop is the first person to be executed during the Salem witch trials in Salem, Massachusetts.',
            '1940 - World War II: Italy declares war on France and the United Kingdom.',
            '2018 - Iraqi Prime Minister Haider al-Abadi declares victory over the Islamic State of Iraq and the Levant (ISIL) in the city of Mosul.'
        ],
        '06-11': [
            '1770 - Captain James Cook runs aground on the Great Barrier Reef.',
            '1962 - Frank Morris, John Anglin, and Clarence Anglin become the only prisoners to escape from the prison on Alcatraz Island. No trace of them is ever found.',
            '2018 - The U.S. President Donald Trump and North Korean leader Kim Jong-un meet for a summit in Singapore, the first-ever meeting between leaders of the United States and North Korea.'
        ],
        '06-12': [
            '1665 - England installs a municipal government in New York City (the former Dutch settlement of New Amsterdam).',
            '1967 - The United States Supreme Court in Loving v. Virginia declares all U.S. state laws which prohibit interracial marriage to be unconstitutional.',
            '2016 - Forty-nine people are killed and 53 others are injured in a mass shooting at Pulse nightclub in Orlando, Florida.'
        ],
        '06-13': [
            '1373 - Anglo-Portuguese Alliance between England (succeeded by the United Kingdom) and Portugal, the oldest alliance in the world which is still in force.',
            '1966 - The United States Supreme Court rules in Miranda v. Arizona that the police must inform suspects of their rights before questioning them.',
            '2019 - A fire breaks out at a shopping center in Surat, India, killing at least 22 teenagers and injuring more than a dozen others.'
        ],
        '06-14': [
            '1216 - King John of England loses his crown jewels in The Wash, probably near Fosdyke, perhaps near Sutton Bridge.',
            '1959 - Disneyland Monorail System, the first daily operating monorail system in the Western Hemisphere, opens to the public in Anaheim, California.',
            '2019 - Two oil tankers are attacked in the Gulf of Oman, causing oil prices to rise and tensions between the United States and Iran to escalate.'
        ],
        '06-15': [
            '1215 - King John of England puts his seal to Magna Carta.',
            '1667 - The first human blood transfusion is administered by Dr. Jean-Baptiste Denys.',
            '2015 - The Golden State Warriors win the NBA Finals, defeating the Cleveland Cavaliers to claim their first championship since 1975.'
        ],
        '06-16': [
            '1586 - Mary, Queen of Scots, recognizes Philip II of Spain as her heir and successor.',
            '1858 - Abraham Lincoln delivers his House Divided speech in Springfield, Illinois.',
            '2017 - A magnitude 6.9 earthquake strikes Guatemala, killing five people and injuring 1,200 others.'
        ],
        '06-17': [
            '1497 - Battle of Deptford Bridge: Forces under King Henry VII defeat troops led by Michael An Gof.',
            '1972 - Watergate scandal: Five White House operatives are arrested for burglarizing the offices of the Democratic National Committee, in an attempt by some members of the Republican party to illegally wiretap the opposition.',
            '2019 - Five people are killed and 20 others are injured in a terrorist attack in Ghazni, Afghanistan.'
        ],
        '06-18': [
            '1812 - War of 1812: The U.S. Congress declares war on the United Kingdom.',
            '1940 - Appeal of June 18 by Charles de Gaulle.',
            '2017 - A massive landslide in Xinmo village, Mao County, Sichuan, China, kills at least 10 people and more than 100 others are feared buried.'
        ],
        '06-19': [
            '1269 - King Louis IX of France orders all Jews found in public without an identifying yellow badge to be fined ten livres of silver.',
            '1953 - Julius and Ethel Rosenberg are executed at Sing Sing, in New York.',
            '2014 - Islamic State of Iraq and the Levant (ISIS) announces its establishment of a caliphate, allying itself with other jihadist groups.'
        ],
        '06-20': [
            '1214 - The University of Oxford receives its charter.',
            '1963 - The United States and Soviet Union sign an agreement to set up a "hot line" communication system between the two superpowers.',
            '2013 - A multi-day cloudburst centered on the North Indian state of Uttarakhand caused devastating floods and landslides, becoming the country\'s worst natural disaster since the 2004 tsunami.'
        ],
        '06-21': [
            '1307 - Külüg Khan is enthroned as Khagan of the Mongols and Wuzong of the Yuan.',
            '1948 - Columbia Records introduces the long-playing record album in a public demonstration at the Waldorf-Astoria Hotel in New York City.',
            '2019 - Hundreds of thousands of protesters gather in Hong Kong against a proposed extradition bill that would allow people to be sent to mainland China for trial.'
        ],
        '06-22': [
            '1633 - The Holy Office in Rome forces Galileo Galilei to recant his view that the Sun, not the Earth, is the center of the Universe in the form he presented it in, after heated controversy.',
            '1978 - Charon, a satellite of Pluto, is discovered by American astronomer James W. Christy.',
            '2012 - Paraguayan President Fernando Lugo is removed from office by impeachment and succeeded by Federico Franco.'
        ],
        '06-23': [
            '1683 - William Penn signs a friendship treaty with Lenni Lenape Indians in Pennsylvania.',
            '1940 - World War II: German leader Adolf Hitler surveys newly defeated Paris in now occupied France.',
            '2018 - A gunman opens fire at an arts and music festival in Trenton, New Jersey, killing one person and injuring 22 others.'
        ],
        '06-24': [
            '1314 - First War of Scottish Independence: The Battle of Bannockburn concludes with a decisive victory by Scottish forces led by Robert the Bruce, though England did not recognize Scottish independence until 1328 with the signing of the Treaty of Edinburgh–Northampton.',
            '1948 - Start of the Berlin Blockade: The Soviet Union makes overland travel between the West with West Berlin impossible.',
            '2016 - A majority of voters in the United Kingdom vote to leave the European Union in a national referendum, prompting Prime Minister David Cameron to announce his resignation.'
        ],
        '06-25': [
            '1178 - Five Canterbury monks see what is possibly the Giordano Bruno crater being formed. It is believed that the current oscillations of the Moon\'s distance from the Earth (on the order of meters) are a result of this collision.',
            '1950 - Korean War: North Korean troops initiate the Battle of Taejon.',
            '2017 - A landslide in Sichuan, China, kills at least 10 people and injures over 120 others.'
        ],
        '06-26': [
            '1409 - Western Schism: The Roman Catholic Church is led into a double schism as Petros Philargos is crowned Pope Alexander V after the Council of Pisa, joining Pope Gregory XII in Rome and Pope Benedict XII in Avignon.',
            '1977 - Elvis Presley holds his final concert in Indianapolis, Indiana at Market Square Arena.',
            '2018 - Saudi Arabia\'s ban on female drivers is lifted.'
        ],
        '06-27': [
            '1358 - Republic of Dubrovnik is founded.',
            '1954 - The world\'s first atomic power station opens at Obninsk, near Moscow.',
            '2018 - A terrorist attack on a government building in Jalalabad, Afghanistan, kills at least 12 people and injures more than 20 others.'
        ],
        '06-28': [
            '1838 - Coronation of Queen Victoria of the United Kingdom.',
            '1914 - Archduke Franz Ferdinand of Austria and his wife Sophie are assassinated in Sarajevo by young Serb nationalist Gavrilo Princip, the casus belli of World War I.',
            '2018 - The Annapolis shooting: A gunman kills five employees of The Capital and injures two others in a mass shooting at a newspaper office in Annapolis, Maryland, United States.'
        ],
        '06-29': [
            '1613 - The Globe Theatre in London, England burns to the ground.',
            '1974 - Isabel Perón is sworn in as the first female President of Argentina.',
            '2016 - A terrorist attack on Istanbul Atatürk Airport in Turkey kills 45 people and injures more than 230 others.'
        ],
        '06-30': [
            '1520 - Spanish conquistadors led by Hernán Cortés fight their way out of Tenochtitlan.',
            '1864 - U.S. President Abraham Lincoln grants Yosemite Valley to California for "public use, resort and recreation".',
            '2016 - A terrorist attack in Baghdad, Iraq, kills over 340 people and injures more than 200 others.'
        ],
        '07-01': [
            '1569 - Union of Lublin: The Kingdom of Poland and the Grand Duchy of Lithuania confirm a real union; the united country is called the Polish–Lithuanian Commonwealth or the Republic of Both Nations.',
            '1960 - Ghana becomes a republic and Kwame Nkrumah becomes its first President as Queen Elizabeth II ceases to be its head of state.',
            '2018 - At least 246 people are killed and more than 500 others injured in the derailment of a passenger train in the province of Punjab, Pakistan.'
        ],
        '07-02': [
            '1298 - Battle of Göllheim: The army of Philip IV of France defeats the rebellious Flemish, ending the Flemish independence movement.',
            '1934 - The Night of the Long Knives ends with the death of Ernst Röhm.',
            '2019 - At least 41 people are killed and more than 100 others are injured after a train collides with a truck and derails in Yaoundé, Cameroon.'
        ],
        '07-03': [
            '1608 - Québec City is founded by Samuel de Champlain.',
            '1913 - Confederate veterans at the Great Reunion of 1913 reenact Pickett\'s Charge; upon reaching the high-water mark of the Confederacy they are met by the outstretched hands of friendship from Union survivors.',
            '2016 - ISIS claims responsibility for coordinated terror attacks in Baghdad that kill at least 300 people and injure more than 221 others.'
        ],
        '07-04': [
            '1054 - A supernova, called SN 1054, is seen by Chinese Song dynasty, Arab and possibly Amerindian observers near the star Zeta Tauri. For several months it remains bright enough to be seen during the day. Its remnants form the Crab Nebula.',
            '1776 - American Revolution: The United States Declaration of Independence is adopted by the Second Continental Congress.',
            '2016 - At least 300 people are killed and more than 250 others are injured in a suicide bombing in Baghdad, Iraq.'
        ],
        '07-05': [
            '1687 - Isaac Newton publishes Philosophiæ Naturalis Principia Mathematica.',
            '1946 - The bikini goes on sale after debuting during an outdoor fashion show at the Molitor Pool in Paris, France.',
            '2018 - A heat wave in Quebec, Canada, causes 54 deaths.'
        ],
        '07-06': [
            '1253 - Mindaugas is crowned King of Lithuania.',
            '1885 - Louis Pasteur successfully tests his vaccine against rabies on Joseph Meister, a boy who was bitten by a rabid dog.',
            '2018 - A series of arson attacks targeting cars and buildings occur in Gothenburg and Trollhättan, Sweden.'
        ],
        '07-07': [
            '1770 - The Battle of Larga between the Russian Empire and the Ottoman Empire takes place.',
            '2005 - A series of four explosions occurs on London\'s transport system, killing 56 people, including four suicide bombers, and injuring over 700 others.'
        ],
        '07-08': [
            '1099 - First Crusade: Fifteen thousand starving Christian soldiers march in a religious procession around Jerusalem as its Muslim defenders look on.',
            '1947 - Reports are broadcast that a UFO crash-landed in Roswell, New Mexico in what became known as the Roswell UFO incident.',
            '2019 - A magnitude 6.6 earthquake strikes off the coast of Western Australia.'
        ],
        '07-09': [
            '1609 - Bohemia is granted freedom of religion through the Letter of Majesty by the Holy Roman Emperor, Rudolf II.',
            '1811 - Explorer David Thompson posts a sign at the confluence of the Columbia and Snake Rivers (in modern Washington state, US), claiming the land for the United Kingdom.',
            '2019 - As the British Ambassador to the United States, Kim Darroch, resigns over leaked diplomatic cables critical of President Donald Trump, Prime Minister Theresa May faces criticism for her handling of the situation.'
        ],
        '07-10': [
            '1553 - Lady Jane Grey takes the throne of England.',
            '1940 - World War II: The Battle of Britain begins with the Luftwaffe attacking shipping convoys off the south-east coast of England.',
            '2018 - The Irish Senate passes a bill to ban the importation of goods from Israeli settlements in the West Bank.'
        ],
        '07-11': [
            '1302 - Battle of the Golden Spurs (Guldensporenslag in Dutch) – a coalition around the Flemish cities defeats the king of France\'s royal army.',
            '1979 - The city of Damascus, Syria, is declared the Arab Capital of Culture.',
            '2017 - Two tourists are killed and four others are injured in a knife attack at a beach resort in Hurghada, Egypt.'
        ],
        '07-12': [
            '1562 - Fray Diego de Landa, acting Bishop of Yucatán, burns the sacred books of the Maya.',
            '1917 - The Bisbee Deportation occurs as vigilantes kidnap and deport nearly 1,300 striking miners and others from Bisbee, Arizona.',
            '2016 - A truck driven by Mohamed Lahouaiej-Bouhlel plows through a crowd during Bastille Day celebrations in Nice, France, killing 86 people and injuring 434 others.'
        ],
        '07-13': [
            '1249 - Coronation of Alexander III as King of Scots.',
            '1973 - Alexander Butterfield reveals the existence of the Nixon tapes to the special Senate committee investigating the Watergate break-in.',
            '2018 - President Donald Trump arrives in the United Kingdom for his first official visit, amid widespread protests.'
        ],
        '07-14': [
            '1223 - Louis VIII becomes King of France upon the death of his father, Philip II of France.',
            '1789 - French Revolution: Citizens of Paris storm the Bastille.',
            '2015 - NASA\'s New Horizons probe performs a close flyby of Pluto, becoming the first spacecraft to visit the distant dwarf planet.'
        ],
        '07-15': [
            '1099 - First Crusade: Christian soldiers take the Church of the Holy Sepulchre in Jerusalem after the final assault of a difficult siege.',
            '1799 - The Rosetta Stone is found in the Egyptian village of Rosetta by French Captain Pierre-François Bouchard during Napoleon\'s Egyptian Campaign.',
            '2016 - A coup d\'état attempt in Turkey fails, resulting in the deaths of at least 251 people and the arrest of thousands more.'
        ],
        '07-16': [
            '1212 - Battle of Las Navas de Tolosa: After Pope Innocent III calls European knights to a crusade, forces of Kings Alfonso VIII of Castile, Sancho VII of Navarre, Peter II of Aragon, and Afonso II of Portugal defeat those of the Berber Muslim leader Almohad, thus marking a significant turning point in the Reconquista and in the medieval history of Spain.',
            '1945 - Manhattan Project: The Atomic Age begins when the United States successfully detonates a plutonium-based test nuclear weapon near Alamogordo, New Mexico.',
            '2019 - NASA\'s Apollo 11 mission to the moon marks its 50th anniversary.'
        ],
        '07-17': [
            '180 - Twelve inhabitants of Scillium in North Africa are executed for being Christians. This is the earliest record of Christianity in that part of the world.',
            '1918 - Tsar Nicholas II of Russia and his immediate family and retainers are executed by Bolshevik Chekists at the Ipatiev House in Yekaterinburg, Russia.',
            '2014 - Malaysia Airlines Flight 17, a Boeing 777, crashes near the border of Ukraine and Russia after being shot down. All 298 people on board are killed.'
        ],
        '07-18': [
            '1863 - American Civil War: Second Battle of Fort Wagner: One of the first formal African American military units, the 54th Massachusetts Volunteer Infantry, supported by several white regiments, attempts an unsuccessful assault on Confederate-held Battery Wagner.',
            '1925 - Adolf Hitler publishes Mein Kampf.',
            '2019 - The United Kingdom\'s Royal Navy intercepts an Iranian attempt to obstruct the passage of a British commercial vessel through the Strait of Hormuz.'
        ],
        '07-19': [
            '1545 - The Tudor warship Mary Rose sinks off Portsmouth; in 1982 the wreck is salvaged in one of the most complex and expensive projects in the history of maritime archaeology.',
            '1848 - Women\'s rights: A two-day Women\'s Rights Convention opens in Seneca Falls, New York.',
            '2016 - A mass shooting occurs at a shopping center in Munich, Germany, killing ten people, including the perpetrator, and injuring 36 others.'
        ],
        '07-20': [
            '1304 - Wars of Scottish Independence: Fall of Stirling Castle: King Edward I of England takes the last rebel stronghold of the war.',
            '1969 - Apollo program: Apollo 11 successfully lands the first humans, Americans Neil Armstrong and Buzz Aldrin, on the Moon at 20:18 UTC on July 20th. They spend about two and a quarter hours together outside the spacecraft, and they leave behind an American flag and a sign that says, "Here men from the planet Earth first set foot upon the Moon July 1969, A.D. We came in peace for all mankind."',
            '2012 - Aurora, Colorado, shooting: Twelve people are killed and 70 others are injured in a mass shooting at a movie theater.'
        ],
        '07-21': [
            '1861 - American Civil War: First Battle of Bull Run: At Manassas Junction, Virginia, the first major battle of the war begins and ends in a victory for the Confederate army.',
            '1925 - Scopes Trial: In Dayton, Tennessee, high school biology teacher John T. Scopes is found guilty of teaching evolution in class and fined $100.',
            '2019 - At least 14 people are killed and 145 others are injured in a terrorist bombing outside a police station in Kabul, Afghanistan.'
        ],
        '07-22': [
            '1099 - First Crusade: Godfrey of Bouillon is elected the first Defender of the Holy Sepulchre of The Kingdom of Jerusalem.',
            '1793 - Alexander Mackenzie reaches the Pacific Ocean becoming the first recorded human to complete a transcontinental crossing of North America.',
            '2016 - A gunman opens fire at a shopping mall in Munich, Germany, killing nine people and injuring 36 others before committing suicide.'
        ],
        '07-23': [
            '1319 - A Knights Hospitaller fleet scores a crushing victory over an Aydinid fleet off Chios.',
            '1885 - Ulysses S. Grant, the 18th President of the United States, dies of throat cancer.',
            '2018 - A gunman opens fire outside a restaurant in Toronto, Canada, killing two people and injuring 13 others.'
        ],
        '07-24': [
            '1487 - Citizens of Leeuwarden, Netherlands strike against a ban on foreign beer.',
            '1911 - American archeologist Hiram Bingham III re-discovers Machu Picchu, "the Lost City of the Incas".',
            '2016 - A gunman kills nine people at a shopping mall in Munich, Germany, before committing suicide.'
        ],
        '07-25': [
            '1261 - The city of Constantinople is recaptured by Nicaean forces under the command of Alexios Strategopoulos, re-establishing the Byzantine Empire.',
            '1978 - Louise Joy Brown, the world\'s first "test tube baby", is born in Oldham, Greater Manchester, UK.',
            '2019 - Boris Johnson is elected as the leader of the Conservative Party in the United Kingdom, becoming Prime Minister the next day.'
        ],
        '07-26': [
            '657 - Battle of Siffin.',
            '1775 - The United States Postal Service is established by the Second Continental Congress, with Benjamin Franklin as its first postmaster general.',
            '2016 - An ISIL-claimed terrorist attack kills over 80 people in Kabul, Afghanistan.'
        ],
        '07-27': [
            '1054 - Siward, Earl of Northumbria invades Scotland and defeats Macbeth, King of Scotland somewhere north of the Firth of Forth.',
            '1976 - Former Japanese prime minister Kakuei Tanaka is arrested on suspicion of violating foreign exchange and foreign trade laws in connection with the Lockheed bribery scandals.',
            '2018 - California wildfires: A wildfire begins in Redding, California, eventually becoming the sixth-most destructive wildfire in the state\'s history.'
        ],
        '07-28': [
            '1364 - Troops of the Republic of Pisa and the Republic of Florence clash in the Battle of Cascina.',
            '1854 - USS Constellation, the last all-sail warship built by the United States Navy, is commissioned.',
            '2018 - A series of wildfires across Attica, Greece, kill at least 99 people and injure more than 100 others.'
        ],
        '07-29': [
            '1014 - Byzantine-Bulgarian wars: Battle of Kleidion – Byzantine emperor Basil II inflicts a decisive defeat on the Bulgarian army, and his subsequent treatment of 15,000 prisoners reportedly causes Tsar Samuel of Bulgaria to die of a heart attack less than three months later, on October 6.',
            '1588 - Anglo-Spanish War: Battle of Gravelines: English naval forces under the command of Lord Charles Howard and Sir Francis Drake defeat the Spanish Armada off the coast of Gravelines, France.',
            '2016 - A knife attack in a facility for disabled people in Sagamihara, Japan, kills 19 people and injures 26 others.'
        ],
        '07-30': [
            '1419 - First Defenestration of Prague: A crowd of radical Hussites kill seven members of the Prague city council.',
            '1930 - In Montevideo, Uruguay wins the first FIFA World Cup.',
            '2016 - At least 15 people are killed and 15 others are injured in a suicide bombing in Quetta, Pakistan.'
        ],
        '07-31': [
            '1498 - On his third voyage to the Western Hemisphere, Christopher Columbus becomes the first European to discover the island of Trinidad.',
            '1930 - The radio mystery program The Shadow airs for the first time.',
            '2016 - A suicide bombing in Kabul, Afghanistan, kills at least 80 people and injures 231 others.'
        ],
        '08-01': [
            '527 - Justinian I becomes the sole ruler of the Byzantine Empire.',
            '1834 - Slavery is abolished in the British Empire as the Slavery Abolition Act 1833 comes into force.',
            '2018 - Apple Inc. becomes the world\'s first publicly traded company to be valued at $1 trillion.'
        ],
        '08-02': [
            '338 BC - A Macedonian army led by Philip II defeats the combined forces of Athens and Thebes in the Battle of Chaeronea, securing Macedonian hegemony in Greece and the Aegean.',
            '1922 - A typhoon hits Shantou, Republic of China killing more than 50,000 people.',
            '2019 - A mass shooting takes place at a Walmart store in El Paso, Texas, United States, resulting in 23 deaths and 23 injuries.'
        ],
        '08-03': [
            '1492 - Christopher Columbus sets sail from Palos de la Frontera, Spain.',
            '1914 - World War I: Germany declares war against France.',
            '2016 - A terrorist bombing of a hospital in Quetta, Pakistan, kills at least 70 people and injures more than 120 others.'
        ],
        '08-04': [
            '1790 - A newly passed tariff act creates the Revenue Cutter Service (the forerunner of the United States Coast Guard).',
            '1902 - The Greenwich foot tunnel under the River Thames opens.',
            '2019 - At least 20 people are killed and 26 others are injured in a shooting at a Walmart store in El Paso, Texas, United States.'
        ],
        '08-05': [
            '910 - The Battle of Tettenhall: The Anglo-Saxons, led by Aethelred of Wessex, and the Mercians, led by his brother-in-law Earl Aethelred I, defeat the Viking army at Tettenhall, near Wolverhampton in England.',
            '1963 - The United States, the United Kingdom, and the Soviet Union sign the Partial Nuclear Test Ban Treaty prohibiting the testing of nuclear weapons in the atmosphere, underwater, or in outer space.',
            '2019 - India revokes the special status of Jammu and Kashmir, effectively stripping the state of its autonomy.'
        ],
        '08-06': [
            '1806 - Francis II, the last Holy Roman Emperor, abdicates, ending the Holy Roman Empire.',
            '1945 - World War II: Atomic bombing of Hiroshima: A United States B-29 Superfortress, the Enola Gay, drops an atomic bomb, codenamed "Little Boy", on Hiroshima, Japan, at 08:15 (local time).',
            '2016 - A suicide bombing at a hospital in Quetta, Pakistan, kills at least 74 people and injures more than 120 others.'
        ],
        '08-07': [
            '1427 - The Visconti of Milan\'s fleet is destroyed by the Venetians on the Po River.',
            '1782 - George Washington orders the creation of the Badge of Military Merit to honor soldiers wounded in battle. It is later renamed to the more poetic Purple Heart.',
            '2019 - The government of India revokes the special status of Jammu and Kashmir, leading to widespread concern and opposition.'
        ],
        '08-08': [
            '1220 - Sweden is defeated by Estonian tribes in the Battle of Lihula.',
            '1945 - The London Charter is signed by France, the United Kingdom, the Soviet Union, and the United States, establishing the laws and procedures for the Nuremberg trials.',
            '2019 - A gunman opens fire at a mosque in Oslo, Norway, injuring one person before being overpowered by worshippers.'
        ],
        '08-09': [
            '48 BC - Caesar\'s Civil War: Battle of Pharsalus: Julius Caesar decisively defeats Pompey at Pharsalus and Pompey flees to Egypt.',
            '1945 - Atomic bombing of Nagasaki: A United States B-29 Superfortress, Bockscar, drops an atomic bomb, codenamed "Fat Man", on Nagasaki, Japan, at 11:02 (local time).',
            '2018 - In Zimbabwe, opposition protesters denounce the results of the country\'s general elections, in which ZANU–PF won a majority of seats in parliament and Emmerson Mnangagwa was elected president.'
        ],
        '08-10': [
            '1846 - The Smithsonian Institution is chartered by the United States Congress after James Smithson donates $500,000.',
            '1944 - World War II: The Battle of Narva ends with a combined German–Estonian–Russian force successfully defending Narva, Estonia, from invading Soviet troops.',
            '2019 - A stampede at a football stadium in Kasarani, Nairobi, Kenya, kills at least four people and injures several others.'
        ],
        '08-11': [
            '106 - The south-western part of Dacia (modern-day Romania) becomes a Roman province: Roman Dacia.',
            '1934 - The first civilian prisoners arrive at the Federal prison on Alcatraz Island.',
            '2019 - Riots break out in Harare, Zimbabwe, following the release of presidential election results, leaving at least six people dead and several others injured.'
        ],
        '08-12': [
            '30 BC - Cleopatra VII Philopator, the last ruler of the Egyptian Ptolemaic dynasty, commits suicide allegedly by means of an asp bite.',
            '1953 - Nuclear weapons testing: The Soviet atomic bomb project continues with the detonation of Joe 4, the first Soviet thermonuclear weapon.',
            '2017 - The city of Charlottesville, Virginia, experiences violent clashes and a vehicular attack during a white nationalist rally, resulting in one death and multiple injuries.'
        ],
        '08-13': [
            '1521 - After an extended siege, forces led by Spanish conquistador Hernán Cortés capture Tlatoani Cuauhtémoc and conquer the Aztec capital of Tenochtitlan.',
            '1961 - East Germany closes the border between the eastern and western sectors of Berlin to thwart its inhabitants\' attempts to escape to the West.',
            '2018 - A gunman opens fire on a group of people outside a restaurant in Toronto, Canada, killing two people and injuring 13 others before dying by suicide.'
        ],
        '08-14': [
            '1183 - Taira no Munemori and the Taira clan take the young Emperor Antoku and the three sacred treasures and flee to western Japan to escape pursuit by the Minamoto clan (traditional Japanese date: Twenty-fifth Day of the Seventh Month of the Second Year of Juei).',
            '1933 - Loggers cause a forest fire in the Coast Range of Oregon, later known as the first forest fire of the Tillamook Burn. It is extinguished on September 5, after destroying 240,000 acres (970 km2).',
            '2019 - A stabbing incident in Sydney, Australia, leaves one woman dead and another injured. The perpetrator is subdued by bystanders.'
        ],
        '08-15': [
            '636 - Arab–Byzantine wars: The Battle of Yarmouk between Byzantine Empire and Rashidun Caliphate begins.',
            '1945 - World War II: Victory over Japan Day: Japan surrenders. The surrender of Japan effectively ends World War II.',
            '2017 - A van plows into pedestrians in the Las Ramblas district of Barcelona, Spain, killing 16 people and injuring at least 130 others.'
        ],
        '08-16': [
            '1513 - War of the League of Cambrai: The Battle of Guinegate (Battle of the Spurs) – King Henry VIII of England defeats French Forces, who are then forced to retreat.',
            '1780 - American Revolutionary War: Battle of Camden: The British defeat the Americans near Camden, South Carolina.',
            '2018 - A magnitude 6.2 earthquake strikes Lombok, Indonesia, killing at least 460 people and injuring more than 1,300 others.'
        ],
        '08-17': [
            '1668 - An earthquake with a magnitude of 8.0 strikes Anatolia, leaving around 8,000 dead.',
            '1943 - World War II: First Québec Conference of Winston Churchill, Franklin D. Roosevelt, and William Lyon Mackenzie King begins.',
            '2017 - A van crashes into a crowd of people in the Las Ramblas district of Barcelona, Spain, killing 14 people and injuring at least 100 others.'
        ],
        '08-18': [
            '1487 - The Siege of Málaga ends with the taking of the city by Castilian and Aragonese forces.',
            '1920 - The Nineteenth Amendment to the United States Constitution is ratified, guaranteeing women\'s suffrage.',
            '2017 - The first suspected case of locally transmitted Zika virus in Texas, United States is reported.'
        ],
        '08-19': [
            '43 BC - Gaius Julius Caesar Octavianus, later known as Augustus, compels the Roman Senate to elect him Consul.',
            '1946 - Bill Clinton, 42nd President of the United States, is born in Hope, Arkansas.',
            '2019 - A suicide bombing at a wedding in Kabul, Afghanistan, kills at least 92 people and injures more than 140 others.'
        ],
        '08-20': [
            '636 - Battle of Yarmouk: Arab forces led by Khalid ibn al-Walid take control of Syria and Palestine from the Byzantine Empire, marking the first great wave of Muslim conquests and the rapid advance of Islam outside Arabia.',
            '1910 - The Great Fire of 1910 (also commonly referred to as the "Big Blowup" or the "Big Burn") occurs in northeast Washington, northern Idaho (the panhandle), and western Montana, burning approximately 3 million acres (12,141 km2) and killing at least 87 people.',
            '2018 - A suicide bombing at an education center in Kabul, Afghanistan, kills at least 48 people and injures 67 others.'
        ],
        '08-21': [
            '1689 - The Battle of Dunkeld in Scotland is part of the Jacobite rising, with Royalist forces defeating the Jacobites.',
            '1911 - The Mona Lisa is stolen by a Louvre employee.',
            '2017 - The United States Navy\'s guided missile destroyer USS John S. McCain collides with the merchant ship Alnic MC in the Strait of Malacca, leaving 10 sailors dead and 5 injured.'
        ],
        '08-22': [
            '1485 - The Battle of Bosworth Field takes place during the Wars of the Roses, resulting in the victory of Henry Tudor (Henry VII of England) over Richard III of England.',
            '1944 - World War II: Holocaust of Kedros in Crete by German troops.',
            '2019 - Over 1.7 million people participate in a pro-democracy demonstration at Victoria Park, Hong Kong.'
        ],
        '08-23': [
            '1305 - William Wallace, who led the Scottish resistance against England, is captured by the English near Glasgow and transported to London where he is put on trial and executed.',
            '1942 - World War II: Beginning of the Battle of Stalingrad.',
            '2017 - A terrorist attack in Barcelona, Spain, kills at least 13 people and injures over 130 others.'
        ],
        '08-24': [
            '410 - The Visigoths under king Alaric I begin to pillage Rome, and for three days the Visigoths loot, burn, and pillage the city, ultimately capturing Galla Placidia, daughter of the Emperor Theodosius I.',
            '1995 - Microsoft Windows 95 was released to the public in North America.',
            '2019 - A bomb explodes at a wedding hall in Kabul, Afghanistan, killing 92 people and injuring 142 others.'
        ],
        '08-25': [
            '1609 - Galileo Galilei demonstrates his first telescope to Venetian lawmakers.',
            '1942 - World War II: Battle of Milne Bay, Papua New Guinea.',
            '2017 - Hurricane Harvey makes landfall in Texas as a Category 4 hurricane, causing catastrophic flooding and claiming at least 107 lives.'
        ],
        '08-26': [
            '1278 - Ladislaus IV of Hungary and Rudolph I of Germany defeat Ottokar II of Bohemia in the Battle on the Marchfeld near Dürnkrut in (then) Moravia.',
            '1789 - The Declaration of the Rights of Man and of the Citizen is approved by the National Constituent Assembly of France.',
            '2019 - United States President Donald Trump announces his interest in purchasing Greenland, which is met with mixed reactions from Greenlandic and Danish politicians.'
        ],
        '08-27': [
            '410 - The sacking of Rome by the Visigoths ends after three days.',
            '1859 - Petroleum is discovered in Titusville, Pennsylvania, leading to the world\'s first commercially successful oil well.',
            '2017 - Typhoon Hato, a Category 3-equivalent typhoon, strikes Hong Kong and Macau, killing at least 12 people and injuring over 50 others.'
        ],
        '08-28': [
            '1609 - Henry Hudson discovers Delaware Bay.',
            '1963 - March on Washington for Jobs and Freedom: The Reverend Martin Luther King, Jr. gives his I Have a Dream speech.',
            '2017 - Typhoon Hato strikes southern China, Hong Kong, and Macau, killing at least 24 people and causing over $1 billion in damage.'
        ],
        '08-29': [
            '708 - Copper coins are minted in Japan for the first time (Traditional Japanese date: August 10, 708).',
            '1949 - Soviet atomic bomb project: The Soviet Union tests its first atomic bomb, known as First Lightning or Joe 1, at Semipalatinsk, Kazakhstan.',
            '2019 - Brazilian President Jair Bolsonaro authorizes the deployment of military forces to combat fires in the Amazon rainforest, amid international concern and criticism over his environmental policies.'
        ],
        '08-30': [
            '526 - King Theoderic the Great dies of dysentery at Ravenna; his daughter Amalasuntha takes power as regent for her 10-year-old son Athalaric.',
            '1963 - The Moscow–Washington hotline between the leaders of the United States and the Soviet Union goes into operation.',
            '2017 - Hurricane Harvey makes its fourth landfall near Cameron, Louisiana, as a tropical storm, causing severe flooding in southwestern Louisiana and southeastern Texas.'
        ],
        '08-31': [
            '1056 - After a sudden illness a few days previously, Byzantine Empress Theodora dies childless, thus ending the Macedonian dynasty.',
            '1888 - Mary Ann Nichols is murdered, leading to the start of the Jack the Ripper killings in London.',
            '2019 - Hurricane Dorian makes landfall in the Bahamas as a Category 5 hurricane, causing catastrophic damage and resulting in at least 70 deaths.'
        ],
        '09-01': [
            '1159 - Pope Alexander III is chosen after a papal election and will go on to become one of the most controversial popes of the High Middle Ages.',
            '1939 - World War II: Nazi Germany invades Poland, beginning the European phase of World War II.',
            '2017 - The International Atomic Energy Agency certifies that Iran is in compliance with the Joint Comprehensive Plan of Action, prompting U.S. President Donald Trump to accuse Iran of not living up to the spirit of the deal.'
        ],
        '09-02': [
            '47 BC - Pharaoh Cleopatra VII of Egypt declares her son co-ruler as Ptolemy XV Caesarion.',
            '1901 - Vice President of the United States Theodore Roosevelt utters the famous phrase, "Speak softly and carry a big stick" at the Minnesota State Fair.',
            '2019 - The Indian Space Research Organisation loses contact with the Vikram lander during its descent to the lunar south pole, ending India\'s first attempt to make a soft landing on the Moon.'
        ],
        '09-03': [
            '1189 - Richard the Lionheart is crowned King of England at Westminster.',
            '1939 - World War II: France, the United Kingdom, New Zealand, and Australia declare war on Germany after the invasion of Poland, forming the Allies.',
            '2018 - A fire at Brazil\'s National Museum in Rio de Janeiro destroys approximately 20 million artifacts, including the oldest human fossil found in Brazil.'
        ],
        '09-04': [
            '476 - Romulus Augustulus, last Western Roman Emperor, abdicates after deposition by Odoacer, a Germanic chieftain, and is sent to live in Campania, Italy.',
            '1941 - World War II: The Holocaust: Karl Fritzsch, deputy camp commandant of Auschwitz, experiments with the use of Zyklon B in the gassing of Soviet POWs.',
            '2019 - A fire aboard the dive boat Conception off the coast of California, United States, kills 34 people.'
        ],
        '09-05': [
            '1666 - Great Fire of London ends: Ten thousand buildings, including St Paul\'s Cathedral, are destroyed, but only six people are known to have died.',
            '1914 - World War I: First Battle of the Marne begins. Northeast of Paris, the French attack and defeat German forces who are advancing on the capital.',
            '2018 - Swedish Prime Minister Stefan Löfven loses a vote of confidence in parliament, resulting in his ouster and the need for a new government.'
        ],
        '09-06': [
            '1492 - Christopher Columbus sails from La Gomera in the Canary Islands, his final port of call before crossing the Atlantic Ocean for the first time.',
            '1939 - World War II: South Africa declares war on Germany.',
            '2019 - Prime Minister of Italy Giuseppe Conte announces his resignation amid political turmoil, blaming the leader of the right-wing League party, Matteo Salvini, for creating a new government crisis.'
        ],
        '09-07': [
            '1159 - Pope Alexander III is chosen after a papal election and will go on to become one of the most controversial popes of the High Middle Ages.',
            '1965 - China announces that it will reinforce its troops on the Indian border.',
            '2018 - A gunman opens fire at a video game tournament in Jacksonville, Florida, United States, killing two people and injuring ten others before dying by suicide.'
        ],
        '09-08': [
            '70 - Roman forces under Titus sack Jerusalem.',
            '1900 - Galveston Hurricane of 1900: A powerful hurricane hits Galveston, Texas, killing about 8,000 people.',
            '2019 - The Bahamas faces a humanitarian crisis following the devastation caused by Hurricane Dorian, with at least 43 people confirmed dead and thousands missing.'
        ],
        '09-09': [
            '337 - Constantine II, Constantius II, and Constans I succeed their father Constantine I as co-emperors. The Roman Empire is divided between the three Augusti.',
            '1950 - The First appearance of the "Peanuts" comic strip.',
            '2019 - The Parliament of the United Kingdom is prorogued, sparking protests across the country against Prime Minister Boris Johnson\'s decision.'
        ],
        '09-10': [
            '506 - The bishops of Visigothic Gaul meet in the Council of Agde.',
            '2001 - Antonio DaCosta from Britain wins the first international "Rock, Paper, Scissors" tournament in London, England.',
            '2018 - Former Malaysian Prime Minister Najib Razak is charged with 25 counts of money laundering and abuse of power in connection with the 1MDB scandal.'
        ],
        '09-11': [
            '1297 - Battle of Stirling Bridge: Scots jointly led by William Wallace and Andrew Moray defeat the English.',
            '1997 - Scotland votes to create its own Parliament after 290 years of union with England.',
            '2019 - The Parliament of the United Kingdom is prorogued, sparking protests across the country against Prime Minister Boris Johnson\'s decision.'
        ],
        '09-12': [
            '1213 - Battle of Muret: The crusading forces of King Peter II of Aragon defeat those of Albigensian heresy at Muret, near Toulouse.',
            '1952 - Strange occurrences, including a mysterious crash, take place in Flatwoods, West Virginia, that are attributed to the Flatwoods Monster.',
            '2018 - Hurricane Florence makes landfall near Wrightsville Beach, North Carolina, United States, as a Category 1 hurricane.'
        ],
        '09-13': [
            '509 BC - The Temple of Jupiter Optimus Maximus on Rome\'s Capitoline Hill is dedicated on the ides of September.',
            '1914 - World War I: South African troops open hostilities in German South-West Africa (Namibia) with an assault on the Ramansdrift police station.',
            '2019 - At least 31 people are killed and over 100 injured in a suicide bombing at a Shia mosque in Kunduz, Afghanistan.'
        ],
        '09-14': [
            '326 - Helena of Constantinople discovers the True Cross and the Holy Sepulchre (Jesus\' tomb) in Jerusalem.',
            '1944 - World War II: Maastricht becomes the first Dutch city to be liberated by allied forces.',
            '2019 - Saudi Aramco\'s Abqaiq and Khurais oil processing facilities are attacked by drones, leading to a significant reduction in Saudi Arabia\'s oil production and global oil prices.'
        ],
        '09-15': [
            '668 - Eastern Roman Emperor Constans II is assassinated in his bath at Syracuse, Italy.',
            '1944 - World War II: The Battle of Peleliu begins as the United States Marine Corps\' 1st Marine Division and the United States Army\'s 81st Infantry Division hit White and Orange beaches under heavy fire from Japanese infantry and artillery.',
            '2017 - London\'s Parsons Green tube station is targeted in a terrorist bombing, injuring 30 people.'
        ],
        '09-16': [
            '1400 - Owain Glyndŵr is declared Prince of Wales by his followers.',
            '1940 - World War II: Italian troops conquer Sidi Barrani.',
            '2019 - At least 40 people are killed and 100 others are injured in an airstrike on a migrant detention center in Tripoli, Libya.'
        ],
        '09-17': [
            '1394 - King Charles VI of France orders the expulsion of Jews from France.',
            '1862 - American Civil War: The Battle of Antietam, the bloodiest day in American history, occurs near Sharpsburg, Maryland.',
            '2019 - The United States Department of the Treasury imposes sanctions on Iran\'s Central Bank and its sovereign wealth fund, in response to the attack on Saudi oil facilities.'
        ],
        '09-18': [
            '323 BC - Alexander the Great dies of fever in Babylon, leaving his empire without a leader.',
            '1947 - The National Security Council and the Central Intelligence Agency are established in the United States under the National Security Act.',
            '2019 - Over 7 million people participate in global climate strikes ahead of the UN Climate Action Summit, with protests occurring in over 150 countries.'
        ],
        '09-19': [
            '335 - Flavius Dalmatius is raised to the rank of Caesar by his uncle, Constantine the Great.',
            '1952 - The United States bars Charlie Chaplin from re-entering the country after a trip to England.',
            '2019 - Typhoon Tapah makes landfall in Japan, causing widespread damage and leaving at least three people dead.'
        ],
        '09-20': [
            '622 - Islamic prophet Muhammad completes his hijra from Mecca to Medina.',
            '1961 - Greek general Konstantinos Dovas becomes Prime Minister of Greece.',
            '2019 - The United States announces plans to send troops and air defense systems to Saudi Arabia and the United Arab Emirates, following the attack on Saudi oil facilities.'
        ],
        '09-21': [
            '455 - Emperor Avitus enters Rome with a Gallic army and consolidates his power.',
            '1984 - Brunei becomes the sixth member of the Association of Southeast Asian Nations (ASEAN).',
            '2019 - At least 24 people are killed and 31 others are injured in a suicide bombing at a campaign rally in Parwan Province, Afghanistan.'
        ],
        '09-22': [
            '480 BC - Battle of Salamis: The Greek fleet under Themistocles defeats the Persian fleet under Xerxes I.',
            '1869 - Richard Wagner\'s opera Das Rheingold premieres in Munich.',
            '2019 - The United States announces additional sanctions against Iran, targeting its central bank and sovereign wealth fund.'
        ],
        '09-23': [
            '1122 - Concordat of Worms: Emperor Henry V and Pope Calixtus II confirm the Concordat of Worms, ending the Investiture Controversy.',
            '1803 - Second Anglo-Maratha War: Battle of Assaye between the British East India Company and the Maratha Empire in India.',
            '2019 - Tropical Storm Imelda causes severe flooding in Texas, United States, killing at least five people and causing widespread damage.'
        ],
        '09-24': [
            '622 - Muhammad completes his hijra from Mecca to Medina.',
            '1852 - The first airship powered by (a steam) engine, created by Henri Giffard, travels 17 miles (27 km) from Paris to Trappes.',
            '2019 - Nancy Pelosi, Speaker of the United States House of Representatives, announces the initiation of a formal impeachment inquiry against President Donald Trump.'
        ],
        '09-25': [
            '1237 - England and Scotland sign the Treaty of York, establishing the location of their common border.',
            '1513 - Spanish explorer Vasco Núñez de Balboa reaches what would become known as the Pacific Ocean.',
            '2019 - A suicide bomber kills at least 26 people at a campaign rally in Charikar, Afghanistan.'
        ],
        '09-26': [
            '46 BC - Julius Caesar dedicates a temple to his mythical ancestor Venus Genetrix in accordance with a vow he made at the Battle of Pharsalus.',
            '1969 - The Beatles release Abbey Road, their eleventh studio album and last recorded album.',
            '2019 - A small plane crashes near the residential area of Goma, Democratic Republic of the Congo, killing 26 people and injuring several others.'
        ],
        '09-27': [
            '1422 - The Treaty of Melno is signed between the Teutonic Order and the Kingdom of Poland and Grand Duchy of Lithuania, creating a territorial division of Prussia.',
            '1962 - Rachel Carson\'s book Silent Spring is published, inspiring an environmental movement and the creation of the Environmental Protection Agency.',
            '2019 - Climate activist Greta Thunberg leads a global climate strike, with protests taking place in over 150 countries.'
        ],
        '09-28': [
            '935 - Saint Wenceslaus is murdered by his brother, Boleslaus I of Bohemia.',
            '1973 - The ITT Building in New York City is bombed in protest at ITT\'s alleged involvement in the September 11, 1973 coup d\'état in Chile.',
            '2019 - More than 2,000 people are arrested in Egypt amid protests against President Abdel Fattah el-Sisi.'
        ],
        '09-29': [
            '480 BC - Battle of Salamis: The Greek fleet under Themistocles defeats the Persian fleet under Xerxes I.',
            '1988 - NASA launches STS-26, the return to flight mission after the Space Shuttle Challenger disaster.',
            '2019 - At least 15 people are killed and 130 others are injured when a bus plunges into a gorge in Poonch district, Jammu and Kashmir, India.'
        ],
        '09-30': [
            '489 - Battle of Verona: The Ostrogoths under king Theodoric the Great defeat the forces of Odoacer for the second time at Verona (Northern Italy).',
            '1927 - Babe Ruth becomes the first baseball player to hit 60 home runs in a season, setting a record that stood for 34 years.',
            '2019 - Thousands of climate activists gather in Washington, D.C. for the "Shutdown D.C." protest, demanding action on climate change.'
        ],
        '10-01': [
            '331 BC - Alexander the Great decisively defeats Darius III of Persia in the Battle of Gaugamela.',
            '1890 - Yosemite National Park is established by the U.S. Congress.',
            '2017 - A mass shooting occurs at the Route 91 Harvest music festival on the Las Vegas Strip in Paradise, Nevada, United States, resulting in 60 deaths and over 400 injuries.'
        ],
        '10-02': [
            '1187 - Siege of Jerusalem: Saladin captures Jerusalem after 88 years of Crusader rule.',
            '1835 - The Texas Revolution begins with the Battle of Gonzales: Mexican soldiers attempt to disarm the people of Gonzales, Texas, but encounter stiff resistance from a hastily assembled militia.',
            '2017 - A gunman opens fire on a crowd of concertgoers at the Route 91 Harvest music festival on the Las Vegas Strip in Paradise, Nevada, United States, killing 60 people and injuring 867 others in the deadliest mass shooting in modern American history.'
        ],
        '10-03': [
            '52 BC - Vercingetorix, leader of the Gauls, surrenders to the Romans under Julius Caesar, ending the siege and Battle of Alesia.',
            '1935 - Italy invades Ethiopia.',
            '2018 - Saudi journalist Jamal Khashoggi is killed inside the Saudi consulate in Istanbul, Turkey, leading to international outrage and calls for an investigation.'
        ],
        '10-04': [
            '1302 - Bruges Matins: The night of unrest leading to the uprising against Philip the Fair of France.',
            '1957 - Sputnik 1 becomes the first artificial satellite to orbit the Earth, inaugurating the Space Age and the Soviet Union\'s early lead in the Space Race.',
            '2018 - The Intergovernmental Panel on Climate Change releases a special report warning that the world has only 12 years to make drastic changes to global energy infrastructure to limit global warming to a maximum of 1.5°C.'
        ],
        '10-05': [
            '1143 - King Alfonso VII of León and Castile recognizes Portugal as a Kingdom.',
            '1962 - Dr. No, the first in the James Bond film series, is released in the United Kingdom.',
            '2017 - The United States announces its decision to withdraw from UNESCO, citing anti-Israel bias and the need for reform in the organization.'
        ],
        '10-06': [
            '1539 - Spanish conquistadors led by Hernando de Soto and accompanied by the enslaved African translator Juan Ortiz, encounter the Mabila settlement of Indigenous people in present-day Alabama, resulting in a pitched battle.',
            '1973 - Yom Kippur War: Israel launches Operation Model, breaching the Suez Canal and surrounding Egyptian Third Army.',
            '2019 - 32 people are killed and 36 others are injured in an arson attack at an animation studio in Kyoto, Japan.'
        ],
        '10-07': [
            '3761 BC - The epoch reference date epoch (origin) of the modern Hebrew calendar (Proleptic Julian calendar).',
            '1959 - The Soviet probe Luna 3 transmits the first ever photographs of the far side of the Moon.',
            '2019 - The Parliament of the United Kingdom reconvenes after being prorogued by Prime Minister Boris Johnson, following a ruling by the Supreme Court that the prorogation was unlawful.'
        ],
        '10-08': [
            '314 - Roman Emperor Licinius is defeated by his colleague Constantine I at the Battle of Cibalae, and loses his European territories.',
            '1871 - Four major fires break out on the shores of Lake Michigan in Chicago, Peshtigo, Wisconsin, Holland, Michigan, and Manistee, Michigan, including the Great Chicago Fire, which ultimately killed at least 1871 people, making it the third deadliest wildfire in U.S. history.',
            '2018 - The UN Intergovernmental Panel on Climate Change releases a special report warning that urgent changes are needed to limit global warming to 1.5°C and avoid catastrophic climate impacts.'
        ],
        '10-09': [
            '768 - Carloman I and Charlemagne are crowned kings of the Franks.',
            '1963 - In northeast Italy, over 2,000 people are killed when a landslide buries several villages.',
            '2019 - A bomb explodes near a bus in Puli Alam, Logar Province, Afghanistan, killing at least 15 people and injuring 80 others.'
        ],
        '10-10': [
            '732 - Battle of Tours: Near Poitiers, France, Frankish leader Charles Martel, a Christian, defeats a large army of Spanish Moors, a turning point in the European struggle against Islam.',
            '1973 - U.S. Vice President Spiro Agnew resigns after being charged with evasion of federal income tax.',
            '2019 - 13 people are killed and 20 others are injured in a bomb explosion at a mosque in Haska Meyna District, Nangarhar Province, Afghanistan.'
        ],
        '10-11': [
            '1138 - A massive earthquake strikes Aleppo, Syria.',
            '1899 - Second Boer War begins: In South Africa, a war between the United Kingdom and the Boers of the Transvaal and Orange Free State erupts.',
            '2019 - Five people are killed and six others are injured in a bomb explosion at a mosque in Kuchlak, Balochistan, Pakistan.'
        ],
        '10-12': [
            '1492 - Christopher Columbus arrives in the Bahamas, marking the beginning of European exploration and colonization of the Americas.',
            '1915 - World War I: British nurse Edith Cavell is executed by a German firing squad for helping Allied soldiers escape from occupied Belgium.',
            '2019 - Thousands of demonstrators gather in London, England, to protest against Brexit, calling for a second referendum.'
        ],
        '10-13': [
            '54 - Roman Emperor Claudius dies from poisoning under mysterious circumstances; many suspect his wife Agrippina the Younger.',
            '1775 - The United States Continental Congress orders the establishment of the Continental Navy (later the United States Navy).',
            '2019 - A Turkish airstrike hits a convoy of vehicles carrying civilians and journalists in northeastern Syria, killing at least 11 people and injuring many others.'
        ],
        '10-14': [
            '1066 - Battle of Hastings: In England on Senlac Hill, seven miles from Hastings, the Norman forces of William the Conqueror defeat the English army and kill King Harold II of England.',
            '1964 - Dr. Martin Luther King, Jr. is awarded the Nobel Peace Prize for his nonviolent resistance to racial prejudice in America.',
            '2019 - At least 12 people are killed and more than 150 others injured in ongoing anti-government protests in Quito, Ecuador.'
        ],
        '10-15': [
            '1211 - Battle of the Rhyndacus: The Latin emperor Henry of Flanders defeats the Nicaean emperor Theodore I Laskaris and his Cuman allies.',
            '1987 - Rugby World Cup: New Zealand becomes the first nation to win the rugby world cup twice by defeating France in the final held in Auckland.',
            '2019 - At least 70 people are killed and over 200 others injured when a mosque collapses during Friday prayers in Nangarhar Province, Afghanistan.'
        ],
        '10-16': [
            '456 - Magister militum Ricimer defeats Emperor Avitus at Piacenza and becomes master of the Western Roman Empire.',
            '1923 - The Walt Disney Company is founded by Walt Disney and his brother, Roy Disney.',
            '2019 - At least 15 people are killed and 32 others injured in a car bomb explosion near a hospital in Qalat, Zabul Province, Afghanistan.'
        ],
        '10-17': [
            '456 - Battle of Placentia: Ricimer defeats the Roman Emperor Avitus near Piacenza (Northern Italy) and becomes master of the Western Roman Empire.',
            '1964 - Prime Minister of Australia Robert Menzies opens the artificial Lake Burley Griffin in the middle of the capital Canberra.',
            '2019 - Typhoon Hagibis makes landfall in Japan, causing widespread flooding and landslides, resulting in at least 98 deaths and over 400 injuries.'
        ],
        '10-18': [
            '1009 - The Church of the Holy Sepulchre in Jerusalem is destroyed by the Fatimid caliph Al-Hakim bi-Amr Allah, who hacks the Church of the Resurrection to pieces.',
            '1851 - Herman Melville\'s Moby-Dick is first published as The Whale by Richard Bentley of London.',
            '2019 - A suicide bombing at a mosque in Nangarhar Province, Afghanistan, kills at least 68 people and injures 36 others.'
        ],
        '10-19': [
            '439 - The Vandals, led by King Gaiseric, take Carthage in North Africa.',
            '1781 - At Yorktown, Virginia, representatives of British commander Lord Cornwallis handed over Cornwallis\'s sword and formally surrendered to George Washington and the comte de Rochambeau.',
            '2019 - Over 40 people are killed and dozens injured in a truck bombing in Paktia Province, Afghanistan.'
        ],
        '10-20': [
            '1349 - Pope Clement VI publishes the papal bull Unigenitus to justify the power of the pope and the use of indulgences.',
            '1973 - The Sydney Opera House is opened by Elizabeth II after 14 years of construction.',
            '2019 - A fire breaks out at the Tokwe Mukorsi Dam in Masvingo Province, Zimbabwe, destroying houses and leaving thousands homeless.'
        ],
        '10-21': [
            '1096 - People\'s Crusade: The Turkish army annihilates the People\'s Army of the West in Anatolia.',
            '1945 - Women\'s suffrage: Women are allowed to vote in national elections for the first time in France.',
            '2019 - Over 60 people are killed and over 200 others injured in a suicide bombing during a voting registration process in Kabul, Afghanistan.'
        ],
        '10-22': [
            '451 - The Council of Chalcedon adopts the Chalcedonian Creed regarding the divine and human nature of Jesus Christ, resulting in the schism between Chalcedonian Christianity and Miaphysite Christianity.',
            '1962 - Cuban Missile Crisis: President John F. Kennedy, after internal counsel from Dwight D. Eisenhower, announces that American reconnaissance planes have discovered Soviet nuclear weapons in Cuba, and that he has ordered a naval "quarantine" of the Communist nation.',
            '2019 - A gunman opens fire at a mosque in Nangarhar Province, Afghanistan, killing at least 62 people and injuring 36 others.'
        ],
        '10-23': [
            '42 BC - Liberators\' civil war: Second Battle of Philippi: Mark Antony and Octavian decisively defeat Brutus\'s army.',
            '1973 - A United Nations sanctioned cease-fire officially ends the Yom Kippur War between Israel and Syria.',
            '2019 - The Parliament of the United Kingdom votes to approve the withdrawal agreement negotiated by Prime Minister Boris Johnson with the European Union, but rejects the proposed timetable for the bill, leading Johnson to pause the legislation.'
        ],
        '10-24': [
            '1260 - The spectacular Cathedral of Chartres is dedicated in the presence of King Louis IX of France; the cathedral is now a UNESCO World Heritage Site.',
            '1851 - William Lassell discovers the moons Umbriel and Ariel of Uranus.',
            '2019 - The Parliament of the United Kingdom approves Prime Minister Boris Johnson\'s Brexit deal in principle, but rejects his proposed timetable for the legislation, prompting Johnson to pause the bill.'
        ],
        '10-25': [
            '1147 - Seljuk Turks defeat German crusaders under Conrad III at the Battle of Dorylaeum.',
            '1971 - The United Nations seats the People\'s Republic of China and expels the Republic of China (see political status of Taiwan and China and the United Nations).',
            '2019 - Over 60 people are killed and over 100 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '10-26': [
            '306 - Martyrdom of Saint Demetrius of Thessaloniki.',
            '1881 - The Gunfight at the O.K. Corral takes place at Tombstone, Arizona.',
            '2019 - Over 70 people are killed and over 100 others injured in a bomb explosion during a wrestling match in Kandahar, Afghanistan.'
        ],
        '10-27': [
            '312 - Constantine the Great is said to have received his famous Vision of the Cross.',
            '1904 - The first underground New York City Subway line opens; the system becomes the biggest in United States, and one of the biggest in world.',
            '2019 - A roadside bomb kills at least 13 civilians in Balkh Province, Afghanistan.'
        ],
        '10-28': [
            '1492 - Christopher Columbus lands in Cuba.',
            '1919 - The U.S. Congress passes the Volstead Act over President Woodrow Wilson\'s veto, paving the way for Prohibition to begin the following January.',
            '2019 - The death toll from anti-government protests in Chile rises to at least 20, with over 1,000 people injured and 1,300 arrested.'
        ],
        '10-29': [
            '1268 - Conradin, the last legitimate male heir of the Hohenstaufen dynasty of Holy Roman Emperors, is executed along with his companion Frederick I, Margrave of Baden by Charles I of Sicily, a political rival and ally to the hostile Roman Catholic Church.',
            '1942 - World War II: Second Battle of El Alamein: At El Alamein in northern Egypt, the British Eighth Army under Field Marshal Montgomery begins a critical offensive to expel the Axis armies from Egypt.',
            '2019 - A gunman opens fire on a group of worshippers at a mosque in Nangarhar Province, Afghanistan, killing at least 72 people and injuring 29 others.'
        ],
        '10-30': [
            '1270 - The Eighth Crusade and siege of Tunis end by an agreement between Charles I of Sicily (brother to King Louis IX of France, who had died months earlier) and the sultan of Tunis.',
            '1938 - Orson Welles broadcasts his radio play of H. G. Wells\'s The War of the Worlds, causing anxiety in some of the audience in the United States.',
            '2019 - At least 73 people are killed and 52 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '10-31': [
            '475 - Romulus Augustulus is proclaimed Western Roman Emperor.',
            '1517 - Martin Luther posts his 95 Theses on the door of the Castle Church in Wittenberg, starting the Protestant Reformation.',
            '2019 - Over 70 people are killed and more than 120 others injured in a bomb explosion at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '11-01': [
            '1512 - Michelangelo\'s painted ceiling of the Sistine Chapel, one of the most famous artworks of the High Renaissance, is exhibited to the public for the first time.',
            '1950 - Puerto Rican nationalists Griselio Torresola and Oscar Collazo attempt to assassinate President Harry S. Truman at Blair House.',
            '2019 - A suicide bombing at a mosque in Nangarhar Province, Afghanistan, kills at least 90 people and injures over 100 others.'
        ],
        '11-02': [
            '1611 - Russian-Polish War: The Polish army recaptures the Moscow Kremlin.',
            '1947 - In California, designer Howard Hughes performs the maiden (and only) flight of the Hughes H-4 Hercules (also known as the "Spruce Goose"), the largest fixed-wing aircraft ever built.',
            '2019 - At least 14 people are killed and over 30 others injured in a roadside bomb blast targeting a minibus in Farah Province, Afghanistan.'
        ],
        '11-03': [
            '361 - Emperor Constantius II dies of a fever at Mopsuestia in Cilicia, on his deathbed he is baptised and declares his cousin Julian rightful successor.',
            '1942 - World War II: Battle of El Alamein: Eighty thousand British, Commonwealth and Empire troops launch a major offensive against Axis forces.',
            '2019 - At least 23 people are killed and over 30 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '11-04': [
            '1333 - The River Arno flooding causing massive damage in Florence as recorded by the Florentine chronicler Giovanni Villani.',
            '1979 - Iranian hostage crisis begins: 500 Iranian students, mostly followers of the Ayatollah Khomeini, invade the U.S. embassy in Tehran and take 90 hostages (53 of whom are American).',
            '2019 - At least 33 people are killed and 67 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '11-05': [
            '1605 - The Gunpowder Plot: Guy Fawkes is arrested.',
            '1913 - King Otto of Bavaria is deposed by his cousin, Prince Regent Ludwig, who assumes the title Ludwig III.',
            '2019 - At least 35 people are killed and over 70 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '11-06': [
            '1528 - Shipwrecked Spanish conquistador Álvar Núñez Cabeza de Vaca becomes the first known European to set foot in Texas.',
            '1869 - In New Brunswick, New Jersey, Rutgers College defeats Princeton University (then known as the College of New Jersey), 6–4, in the first official intercollegiate American football game.',
            '2019 - At least 73 people are killed and over 100 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '11-07': [
            '1492 - The Ensisheim meteorite, the oldest meteorite with a known date of impact, strikes the earth around noon in a wheat field outside the village of Ensisheim, Alsace, France.',
            '1872 - The ship Mary Celeste sails from New York, bound for Genoa. It is found abandoned four weeks later.',
            '2019 - A suicide bombing at a mosque in Nangarhar Province, Afghanistan, kills at least 15 people and injures over 70 others.'
        ],
        '11-08': [
            '960 - Battle of Andrassos: Byzantines under Leo Phokas the Younger score a crushing victory over the Hamdanid Emir of Aleppo, Sayf al-Dawla.',
            '1793 - The French Revolutionary government opens the Louvre to the public as a museum.',
            '2019 - At least 15 people are killed and over 70 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '11-09': [
            '694 - At the Seventeenth Council of Toledo, Egica, a king of the Visigoths of Hispania, accuses Jews of aiding Muslims, sentencing all Jews to slavery.',
            '1965 - Several U.S. states and parts of Canada are hit by a series of blackouts lasting up to 13 hours in the Northeast Blackout of 1965.',
            '2019 - At least 15 people are killed and over 70 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '11-10': [
            '1202 - Fourth Crusade: Despite letters from Pope Innocent III forbidding it and threatening excommunication, Catholic crusaders begin a siege of Zara (now Zadar, Croatia).',
            '1928 - Hirohito is enthroned as Emperor of Japan.',
            '2019 - At least 10 people are killed and over 90 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '11-11': [
            '308 - At Carnuntum, Emperor emeritus Diocletian confers with Galerius, Augustus of the East, and Maximianus, the recently returned former Augustus of the West, in an attempt to end the civil wars of the Tetrarchy.',
            '1889 - Washington is admitted as the 42nd U.S. state.',
            '2019 - A suicide bombing at a mosque in Nangarhar Province, Afghanistan, kills at least 15 people and injures over 70 others.'
        ],
        '11-12': [
            '1439 - Plymouth, England, becomes the first town incorporated by the English Parliament.',
            '1912 - The frozen bodies of Robert Scott and his men are found on the Ross Ice Shelf in Antarctica.',
            '2019 - At least 12 people are killed and over 70 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '11-13': [
            '1002 - English king Æthelred II orders the killing of all Danes in England, known today as the St. Brice\'s Day massacre.',
            '1916 - Prime Minister of Australia Billy Hughes is expelled from the Labor Party over his support for conscription.',
            '2019 - At least 10 people are killed and over 40 others injured in a car bombing at a marketplace in Pul-e-Alam, Logar Province, Afghanistan.'
        ],
        '11-14': [
            '565 - Justin II succeeds his uncle Justinian I as emperor of the Byzantine Empire.',
            '1910 - Aviator Eugene Burton Ely performs the first successful takeoff and landing from a ship in Hampton Roads, Virginia. Landing on the deck of the USS Birmingham in a Curtiss pusher biplane.',
            '2019 - A car bombing at a marketplace in Pul-e-Alam, Logar Province, Afghanistan, kills at least 12 people and injures over 50 others.'
        ],
        '11-15': [
            '1315 - Battle of Morgarten: The Schweizer Eidgenossenschaft ambushes the army of Leopold I.',
            '1943 - World War II: In England, 640 women are admitted to study at Oxford University for the first time.',
            '2019 - At least 11 people are killed and over 40 others injured in a car bombing near a hospital in Pul-e-Alam, Logar Province, Afghanistan.'
        ],
        '11-16': [
            '1272 - While travelling during the Ninth Crusade, Prince Edward becomes King of England upon Henry III of England\'s death, but he will not return to England for nearly two years to assume the throne.',
            '1945 - UNESCO is founded.',
            '2019 - At least 12 people are killed and over 70 others injured in a car bombing near a wrestling match venue in Paghman District, Kabul Province, Afghanistan.'
        ],
        '11-17': [
            '474 - Emperor Leo II dies after a reign of ten months. He is succeeded by his father Zeno, who becomes sole ruler of the Byzantine Empire.',
            '1869 - In Egypt, the Suez Canal, linking the Mediterranean Sea with the Red Sea, is inaugurated.',
            '2019 - A car bombing near a wrestling match venue in Paghman District, Kabul Province, Afghanistan, kills at least 13 people and injures over 70 others.'
        ],
        '11-18': [
            '326 - Old St. Peter\'s Basilica is consecrated.',
            '1978 - Jim Jones leads his Peoples Temple cult in a mass murder-suicide that claims 918 lives in Jonestown, Guyana.',
            '2019 - A car bombing at a wrestling match venue in Charikar, Parwan Province, Afghanistan, kills at least 14 people and injures over 100 others.'
        ],
        '11-19': [
            '461 - Libius Severus is declared emperor of the Western Roman Empire. The real power is in the hands of the magister militum Ricimer.',
            '1969 - Apollo program: Apollo 12 astronauts Pete Conrad and Alan Bean land at Oceanus Procellarum (the "Ocean of Storms") and become the third and fourth humans to walk on the Moon.',
            '2019 - A suicide bombing at an educational center in Ghazni City, Ghazni Province, Afghanistan, kills at least 23 people and injures over 50 others.'
        ],
        '11-20': [
            '762 - During the An Shi Rebellion, the Tang dynasty, with the help of Huihe tribe, recaptures Luoyang from the rebels.',
            '1789 - New Jersey becomes the first U.S. state to ratify the Bill of Rights.',
            '2019 - At least 23 people are killed and over 80 others injured in a suicide bombing at a mosque in Kabul, Afghanistan.'
        ],
        '11-21': [
            '235 - Pope Anterus succeeds Pontian as the nineteenth pope. During the persecutions of emperor Maximinus Thrax, he is martyred.',
            '1985 - United States Navy intelligence analyst Jonathan Pollard is arrested for spying after being caught giving Israel classified information on Arab nations. He is subsequently sentenced to life in prison.',
            '2019 - A car bombing near a medical facility in Qalat, Zabul Province, Afghanistan, kills at least 20 people and injures over 90 others.'
        ],
        '11-22': [
            '1307 - Pope Clement V issues the papal bull Pastoralis Praeeminentiae which instructed all Christian monarchs in Europe to arrest all Templars and seize their assets.',
            '1963 - U.S. President John F. Kennedy is assassinated by Lee Harvey Oswald in Dallas, Texas.',
            '2019 - At least 23 people are killed and over 40 others injured in a suicide bombing at a mosque in Sistan and Baluchestan Province, Iran.'
        ],
        '11-23': [
            '1248 - Reconquista: The Battle of Al Mansurah takes place, resulting in the eventual defeat of the Crusaders and the capture of King Louis IX of France.',
            '1984 - The SETI Institute is founded.',
            '2019 - A car bombing near a police headquarters in Ghazni City, Ghazni Province, Afghanistan, kills at least 10 people and injures over 50 others.'
        ],
        '11-24': [
            '1429 - Hundred Years\' War: Joan of Arc unsuccessfully besieges La Charité.',
            '1859 - Charles Darwin publishes On the Origin of Species, the anniversary of which is sometimes called "Evolution Day".',
            '2019 - A car bombing near a hospital in Charikar, Parwan Province, Afghanistan, kills at least 13 people and injures over 60 others.'
        ],
        '11-25': [
            '571 BC - Servius Tullius, king of Rome, celebrates a triumph for his victory over the Etruscans.',
            '1947 - New Zealand ratifies the Statute of Westminster and thus becomes independent of legislative control by the Parliament of the United Kingdom.',
            '2019 - A car bombing near a police station in Dehrawad District, Uruzgan Province, Afghanistan, kills at least 15 people and injures over 50 others.'
        ],
        '11-26': [
            '43 BC - The Second Triumvirate alliance of Gaius Julius Caesar Octavianus ("Octavian", later "Caesar Augustus"), Marcus Aemilius Lepidus, and Mark Antony is formed.',
            '2008 - In India, terrorists kill at least 166 people and wound over 300 others in a series of coordinated attacks on ten locations in Mumbai.',
            '2019 - A car bombing near a police checkpoint in Shindand District, Herat Province, Afghanistan, kills at least 23 people and injures over 40 others.'
        ],
        '11-27': [
            '176 - Emperor Marcus Aurelius grants his son Commodus the rank of "Imperator" and makes him Supreme Commander of the Roman legions.',
            '1978 - San Francisco, California, Mayor George Moscone and openly gay city supervisor Harvey Milk are assassinated by former supervisor Dan White.',
            '2019 - At least 25 people are killed and over 50 others injured in a suicide bombing at a mosque in Nangarhar Province, Afghanistan.'
        ],
        '11-28': [
            '936 - Shi Jingtang is enthroned as the first emperor of the Later Jin by Emperor Taizong of Liao, following a revolt against Emperor Fei of Later Tang.',
            '1895 - The first American automobile race takes place over the 54 miles from Chicago\'s Jackson Park to Evanston, Illinois. Frank Duryea wins in approximately 10 hours.',
            '2019 - A car bombing at a mosque in Ghazni City, Ghazni Province, Afghanistan, kills at least 23 people and injures over 60 others.'
        ],
        '11-29': [
            '1394 - The Korean king Yi Seong-gye, founder of the Joseon dynasty, moves the capital from Kaesŏng to Hanyang, today known as Seoul.',
            '1929 - U.S. Admiral Richard Byrd becomes the first person to fly over the South Pole.',
            '2019 - A car bombing near a mosque in Pul-e-Alam, Logar Province, Afghanistan, kills at least 10 people and injures over 40 others.'
        ],
        '11-30': [
            '1700 - Battle of Narva: In the Great Northern War, the Swedish army under King Charles XII defeats the Russian army under Tsar Peter I.',
            '1954 - In Sylacauga, Alabama, United States, the Hodges meteorite crashes through a roof and hits a woman taking an afternoon nap in the only documented case of a human being hit by a rock from space.',
            '2019 - A suicide bombing at a mosque in Khost Province, Afghanistan, kills at least 10 people and injures over 20 others.'
        ],
        '12-01': [
            '1420 - Henry V of England enters Paris.',
            '1948 - Taman Shud Case: The body of an unidentified man is found in Adelaide, Australia, involving an undetectable poison and a secret code in a very rare book.',
            '2019 - At least 17 people are killed and over 30 others injured in a car bombing at a marketplace in Pul-e-Alam, Logar Province, Afghanistan.'
        ],
        '12-02': [
            '1409 - The University of Leipzig opens.',
            '1804 - At Notre Dame Cathedral in Paris, Napoleon Bonaparte crowns himself Emperor of the French, the first French Emperor in a thousand years.',
            '2019 - A suicide bombing at an election rally in Takhar Province, Afghanistan, kills at least 12 people and injures over 30 others.'
        ],
        '12-03': [
            '1901 - In a State of the Union message, U.S. President Theodore Roosevelt delivers a 20,000-word speech to the House of Representatives asking Congress to curb the power of trusts "within reasonable limits".',
            '1925 - World War I aftermath: The final Locarno Treaty is signed in London, establishing post-war territorial settlements.',
            '2019 - A suicide bombing at a religious gathering in Takhar Province, Afghanistan, kills at least 12 people and injures over 80 others.'
        ],
        '12-04': [
            '1110 - First Crusade: The Crusaders conquer Sidon.',
            '1943 - World War II: U.S. President Franklin D. Roosevelt closes down the Works Progress Administration, because of the high levels of wartime employment in the United States.',
            '2019 - At least 11 people are killed and over 40 others injured in a suicide bombing at a mosque in Kunduz Province, Afghanistan.'
        ],
        '12-05': [
            '633 - Fourth Council of Toledo takes place.',
            '1952 - Great Smog of London: A cold fog descends upon London, combining with air pollution and killing at least 12,000 in the weeks and months that follow.',
            '2019 - A suicide bombing at a mosque in Nangarhar Province, Afghanistan, kills at least 11 people and injures over 70 others.'
        ],
        '12-06': [
            '1704 - Battle of Chamkaur: During the Mughal-Sikh Wars, an outnumbered Sikh Khalsa defeats a Mughal army.',
            '1921 - The Anglo-Irish Treaty is signed in London by British and Irish representatives.',
            '2019 - A car bombing in Ghazni City, Ghazni Province, Afghanistan, kills at least 14 people and injures over 50 others.'
        ],
        '12-07': [
            '1703 - The Great Storm of 1703, the greatest windstorm ever recorded in the southern part of Great Britain, makes landfall. Winds gust up to 120 mph, and 9,000 people die.',
            '1941 - World War II: Attack on Pearl Harbor – The Imperial Japanese Navy carries out a surprise attack on the United States Pacific Fleet and its defending Army and Marine air forces at Pearl Harbor, Hawaii.',
            '2019 - A car bombing near a hospital in Ghazni City, Ghazni Province, Afghanistan, kills at least 15 people and injures over 100 others.'
        ],
        '12-08': [
            '1660 - A woman (either Margaret Hughes or Anne Marshall) appears on an English public stage for the first time, in the role of Desdemona in a production of Shakespeare\'s play Othello.',
            '1854 - In his Apostolic constitution Ineffabilis Deus, Pope Pius IX proclaims the dogmatic definition of Immaculate Conception, which holds that the Virgin Mary was conceived free of original sin.',
            '2019 - A car bombing near a military base in Maidan Shar, Maidan Wardak Province, Afghanistan, kills at least 13 people and injures over 50 others.'
        ],
        '12-09': [
            '536 - Byzantine General Belisarius enters Rome while the Ostrogothic garrison peacefully leaves the city, returning the old capital to its empire.',
            '1950 - Harry Gold pleads guilty to spying for the Soviet Union by passing secrets from atomic scientist Klaus Fuchs.',
            '2019 - A car bombing in Ghazni City, Ghazni Province, Afghanistan, kills at least 13 people and injures over 80 others.'
        ],
        '12-10': [
            '1799 - France adopts the metre as its official unit of length.',
            '1907 - The worst night of the Brown Dog riots in London, when 1,000 medical students clash with 400 police officers over the existence of a memorial for animals who have been vivisected.',
            '2019 - A car bombing in Ghazni City, Ghazni Province, Afghanistan, kills at least 12 people and injures over 40 others.'
        ],
        '12-11': [
            '361 - Julian the Apostate enters Constantinople as sole Emperor of the Roman Empire.',
            '1941 - World War II: Germany and Italy declare war on the United States, following the Americans\' declaration of war on the Empire of Japan in the wake of the attack on Pearl Harbor. The United States, in turn, declares war on them.',
            '2019 - A car bombing in Ghazni City, Ghazni Province, Afghanistan, kills at least 10 people and injures over 50 others.'
        ],
        '12-12': [
            '627 - Battle of Nineveh: A Byzantine army under Emperor Heraclius defeats Emperor Khosrau II\'s Persian forces, commanded by General Rhahzadh.',
            '1897 - Belo Horizonte, the first planned city in Brazil, is founded.',
            '2019 - A car bombing at a police headquarters in Qalat, Zabul Province, Afghanistan, kills at least 15 people and injures over 100 others.'
        ],
        '12-13': [
            '1294 - Saint Celestine V resigns the papacy after only five months; Celestine hoped to return to his previous life as an ascetic hermit.',
            '1937 - Second Sino-Japanese War: Battle of Nanking – Japanese troops under the command of Lt. General Asaka Yasuhiko launch an assault on the Chinese city of Nanjing.',
            '2019 - A car bombing near a government office in Ghazni City, Ghazni Province, Afghanistan, kills at least 15 people and injures over 70 others.'
        ],
        '12-14': [
            '835 - Sweet Dew Incident: Emperor Wenzong of the Tang dynasty conspires to kill the powerful eunuchs of the Tang court, but the plot is foiled.',
            '1911 - Roald Amundsen\'s team, comprising himself, Olav Bjaaland, Helmer Hanssen, Sverre Hassel, and Oscar Wisting, becomes the first to reach the South Pole.',
            '2019 - A car bombing near a police station in Lashkar Gah, Helmand Province, Afghanistan, kills at least 11 people and injures over 60 others.'
        ],
        '12-15': [
            '533 - Vandalic War: Byzantine general Belisarius defeats the Vandals, commanded by King Gelimer, at the Battle of Tricamarum.',
            '1973 - John Paul Getty III, grandson of American billionaire J. Paul Getty, is found alive near Naples, Italy, after being kidnapped by an Italian gang on July 10.',
            '2019 - A car bombing near a soccer stadium in the city of Taliqan, Takhar Province, Afghanistan, kills at least 13 people and injures over 90 others.'
        ],
        '12-16': [
            '755 - An Lushan revolts against Chancellor Yang Guozhong at Yanjing, initiating the An Lushan Rebellion during the Tang dynasty of China.',
            '1773 - American Revolution: Boston Tea Party – Members of the Sons of Liberty disguised as Mohawk Indians dump hundreds of crates of tea into Boston harbor as a protest against the Tea Act.',
            '2019 - A car bombing near a medical facility in Ghazni City, Ghazni Province, Afghanistan, kills at least 15 people and injures over 100 others.'
        ],
        '12-17': [
            '546 - Siege of Rome: The Ostrogoths under king Totila plunder the city, by bribing the Byzantine garrison.',
            '1790 - Discovery of the Aztec calendar stone.',
            '2019 - A car bombing in Parwan Province, Afghanistan, kills at least 15 people and injures over 60 others.'
        ],
        '12-18': [
            '1271 - Kublai Khan renames his empire "Yuan" (元 yuán), officially marking the start of the Yuan dynasty of Mongolia and China.',
            '1865 - US Secretary of State William Seward proclaims the adoption of the Thirteenth Amendment, prohibiting slavery throughout the United States.',
            '2019 - A car bombing in Parwan Province, Afghanistan, kills at least 13 people and injures over 80 others.'
        ],
        '12-19': [
            '1154 - Henry II of England is crowned at Westminster Abbey.',
            '1972 - Apollo program: Eugene Cernan and Harrison Schmitt begin the third and final extra-vehicular activity (EVA) or "Moonwalk" of Apollo 17. To date they are the last humans to set foot on the Moon.',
            '2019 - A car bombing near a police headquarters in Ghazni City, Ghazni Province, Afghanistan, kills at least 10 people and injures over 50 others.'
        ],
        '12-20': [
            '1803 - The United States formally takes possession of the Louisiana Territory from France.',
            '1987 - In the Israeli-occupied Gaza Strip, the First Intifada begins.',
            '2019 - A car bombing near a military base in Maidan Shar, Maidan Wardak Province, Afghanistan, kills at least 13 people and injures over 90 others.'
        ],
        '12-21': [
            '1140 - Conrad III of Germany besieged Weinsberg.',
            '1967 - Louis Washkansky, the first man to undergo a heart transplant, dies in Cape Town, South Africa, 18 days after the transplant.',
            '2019 - A car bombing near a bus station in Bagram District, Parwan Province, Afghanistan, kills at least 15 people and injures over 70 others.'
        ],
        '12-22': [
            '1135 - Stephen of Blois becomes King of England.',
            '1984 - Bernhard Goetz shoots four would-be muggers on an express train in Manhattan, New York City.',
            '2019 - A car bombing in the provincial capital of Ghazni City, Ghazni Province, Afghanistan, kills at least 12 people and injures over 50 others.'
        ],
        '12-23': [
            '962 - Byzantine-Arab Wars: Under the future Emperor Nicephorus Phocas, Byzantine troops storm the city of Aleppo.',
            '1919 - Sex Disqualification (Removal) Act 1919 becomes law in the United Kingdom, allowing women to become solicitors, barristers, jurors, and magistrates.',
            '2019 - A car bombing near a military base in Balkh Province, Afghanistan, kills at least 11 people and injures over 70 others.'
        ],
        '12-24': [
            '1524 - Portuguese navigator Vasco da Gama, 1st Count of Vidigueira, dies in Cochin, India.',
            '1968 - Apollo program: U.S. spacecraft Apollo 8 enters orbit around the Moon. Astronauts Frank Borman, Jim Lovell and William A. Anders become the first humans to see the far side of the Moon and planet Earth as a whole.',
            '2019 - A car bombing in the provincial capital of Ghazni City, Ghazni Province, Afghanistan, kills at least 10 people and injures over 50 others.'
        ],
        '12-25': [
            '274 - Aurelian, Roman emperor, dedicates a temple to Sol Invictus on the supposed day of the winter solstice and day of rebirth of the Sun at the Dies Natalis Solis Invicti, restoring the cult after 60 years of suppression under the Christian emperors Diocletian and his colleagues.',
            '1066 - William the Conqueror, Duke of Normandy, is crowned king of England, at Westminster Abbey, London.',
            '2019 - A car bombing in the provincial capital of Ghazni City, Ghazni Province, Afghanistan, kills at least 12 people and injures over 50 others.'
        ],
        '12-26': [
            '1862 - American Civil War: The Battle of Chickasaw Bayou begins.',
            '1972 - Vietnam War: As part of Operation Linebacker II, 120 American B-52 Stratofortress bombers attacked Hanoi, including 78 launched from Andersen Air Force Base in Guam, the largest single combat launch in Strategic Air Command history.',
            '2019 - A car bombing near a military base in Khost Province, Afghanistan, kills at least 11 people and injures over 40 others.'
        ],
        '12-27': [
            '537 - The Hagia Sophia is completed.',
            '1978 - Spain becomes a democracy after 40 years of fascist dictatorship.',
            '2019 - A car bombing near a police checkpoint in Ghazni City, Ghazni Province, Afghanistan, kills at least 10 people and injures over 60 others.'
        ],
        '12-28': [
            '893 - An earthquake destroys the city of Dvin, Armenia.',
            '1973 - The Endangered Species Act is passed in the United States.',
            '2019 - A car bombing near a security checkpoint in Kandahar Province, Afghanistan, kills at least 13 people and injures over 30 others.'
        ],
        '12-29': [
            '1851 - The first American YMCA opens in Boston, Massachusetts.',
            '1972 - An Eastern Air Lines Flight 401 (a Lockheed L-1011 TriStar) crashes in the Florida Everglades, causing 101 fatalities.',
            '2019 - A car bombing near a police checkpoint in Kandahar Province, Afghanistan, kills at least 13 people and injures over 40 others.'
        ],
        '12-30': [
            '1816 - The Treaty of St. Louis (1816) between the United States and the united Ottawa, Ojibwa, and Potawatomi Indian tribes is proclaimed.',
            '2006 - Former President of Iraq Saddam Hussein is executed.',
            '2019 - A car bombing near a government building in Ghazni City, Ghazni Province, Afghanistan, kills at least 11 people and injures over 70 others.'
        ],
        '12-31': [
            '406 - Vandals, Alans and Suebians cross the Rhine, beginning an invasion of Gaul.',
            '1946 - President Harry S. Truman officially proclaims the end of hostilities in World War II.',
            '2019 - A car bombing near a security checkpoint in Kandahar Province, Afghanistan, kills at least 15 people and injures over 60 others.'
        ]
    
};

const key = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return events[key] || ['No historical events found for this date.']; // Return events or a default message if no events found
}

function displayResults(results) {
    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = '';

    results.forEach(result => {
        const paragraph = document.createElement('p');
        paragraph.textContent = result;
        resultsContainer.appendChild(paragraph);
    });
}
