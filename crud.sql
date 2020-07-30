-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2020 at 06:48 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user`
--

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `id_level` int(11) NOT NULL,
  `perm_add` int(10) NOT NULL,
  `perm_edit` int(10) NOT NULL,
  `perm_delete` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id`, `name`, `id_level`, `perm_add`, `perm_edit`, `perm_delete`) VALUES
(1, 'superadmin', 1, 1, 1, 1),
(2, 'admin', 2, 1, 1, 1),
(3, 'director', 3, 1, 1, 0),
(4, 'head_of_engineer', 4, 1, 0, 0),
(5, 'operator', 5, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(300) NOT NULL,
  `salt` varchar(300) NOT NULL,
  `token` varchar(255) NOT NULL,
  `level` int(10) NOT NULL,
  `img_profile` varchar(255) NOT NULL,
  `is_delete` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `salt`, `token`, `level`, `img_profile`, `is_delete`) VALUES
(28, 'Arfandy', 'fandy@mail.com', 'a9f8413d03dde83f1291823eed50cdd7c605972f6087c7f1a65eae32a6f37b917a1d3e43de0c48bb5f6eed10c89d9d1a014981210b08137f783a45c969de01b2', 'cc0c873464d4b2d0c0', 'slur', 1, 'public/image/default.png', 0),
(29, 'fandu', 'qwe@asd.asd', 'qwd', 'e1aa1913aa2ccf96df', 'slur', 4, 'public/image/default.png', 0),
(31, 'Exsempel', 'yy@asd.asd', '6eac086d5e994d60e95922beb0fe4a27c776421d01fe417d49421d01742dbf600b9fd7f0c521065d2d46ea0f48574316919b6f70911770bdeb42ac7f46261688', 'a87461de8f0763c9e2', 'slur', 5, 'public/image/default.png', 1),
(33, 'Exempel22', 'Afsf@mail.com', '99cb718d3a4acd03e96361ae29a7ea3d08fba506b75020b89398c3be04d00bbbc377a1a28e92f0b6a66cdd78e82e8915f03cfee819cc9f4f7a722d1e737daada', '142f0fdd86f04fd11d', 'slur', 3, 'public/image/default.png', 0),
(34, 'Exempel12', 'Asa@mail.com', '921a511b821e2005b0377224d998603f8152b82f99dbf928ae195ad688bbeb145d9183856b32583bf2ddf13c85ab9c31b488f8270e5a5db77d04f87dffc51461', '7677bc60ac592a8639', 'slur', 5, 'public/image/default.png', 1),
(35, 'Exempel77', 'Fafsf@ama.amk', '96a0cf010fd94a845706b1b7563b809df40ca40a2574c69c0342ef5ce7372f1d0b9132972b268ebe27dd2205707d722a4bc0e383200ad83b6b9dda9fd04586c2', '329c9db0c662eab8b1', 'slur', 4, 'public/image/default.png', 1),
(36, 'Fabdy', 'Asd@mail.com', 'f28db31f2db0e5d2bd9fc3f7e33b858f01b2f992fa442f37477beeb0cb4c2e5ea53a35d2d3c5bbc3ec9424b49463ffd6280600e0fc2f8fead01cfbbf47e33529', 'af73e32229b117c39f', 'slur', 4, 'public/image/default.png', 1),
(37, 'Fandy', 'fafan@mail.com', '35843292639a98fc14d5619168d47d0cd2d6445ec8c904a08efda05ae552317c09847a8441b7135d2a1303b371ae3a628beac536cc69320f2eb685499e54c688', 'cb08c04d504992c727', 'slur', 4, 'public/image/default.png', 1),
(38, 'Saya', 'aku@mail.com', 'b1a6428959f1e6d057868c401d7bbc3bc79cf0c6150c2c3fb29e95b612e28083ccbccba4e2a7ede2c3a2596b8f310648ea2c2892c75f758c284d3292470311d7', 'bf903ff97591617f0f', 'slur', 0, 'public/image/default.png', 1),
(39, 'Unyu', 'kita@mail.com', 'd0cf43fddb8f386d9fd7e8691904911b3c276d38d382d94473c9c0e53b3cbae67c1f340b815b62cac81b15be8f06286d106a6cd98f9e54ea15ad38eb70132ea8', '601492ae3f0a9ad14d', 'slur', 3, 'public/image/default.png', 0),
(40, 'Kuhaku12', 'qwer@mail.com', '3d7370821747b80424878979b59ec1dfb24cef85abba3d40552ef3869f8b5dc5bd85140dfbc3c44bf1eb4e03982af4a4e60ebbddf517b404c93bfab189f09326', 'd571d2ffbddc2a4306', 'slur', 4, 'public/image/default.png', 0),
(41, 'arfandys', 'fafan@mail.com', '1f1ad93cba62a068922a751c23437d507616619d9fd27c737230d93d805fb83404aef7573cf5eca60ff9243f6c324a58874e4ca3424a8667c66ac3a585ad8ef9', '9a91c06fc1decdf788', 'slur', 4, 'public/image/public/image/public/image/public/image/public/image/public/image1596002738389-user.png', 0),
(42, 'arfandy222', 'fafan@mail.coms', '0a6f6e2f90e27e3a21e6a97294f0e593130699cf037448f49f828553c013d5af94ad7c5e739af6ecbe5c629e4b0f964303063d4d30aeba54b98faf3e797f87a1', '5a6dfb2f7a128f3eb1', 'slur', 3, 'public/image/1596003688115-user.png', 0),
(43, 'arfandys1', 'fafan@mail.coms', 'e9726f3da39b4edb4449294491c11ac19d48e1665978762af45fbcd60f9307d60cf0ef2bea400e85eba7abfe148677f039d05c30e4c4795fa1bfebfa8569acc7', 'fdf199fbaeadbfb0b0', 'slur', 2, 'public/image/default.png', 1),
(44, 'Prikitiws', 'asd@asd.asd', '812da929464829a9ddac05707f2070c008adbc828e5390d2d488fee4aa67b3f753c5df63bf285ba4ad200c8fb238104cc08aa549d8733f0d2f6505bb0a5bc971', 'a7cf605053ce243dc7', 'slur', 4, 'public/image/1596035483973-JavaScript-logo.png', 0),
(45, 'Suparto', 'asd2@asd.asd', '61a88c7ebcb57f9c1c4bfa862d7913a5fe84c8663516f0dec58632ffb3b6ff339855e2f1e7f083318940099d0b28a6d4b0f7c7a2ac3cf6c88fa49c6ecd134102', 'fde6647f851760b094', 'slur', 3, 'public/image/1596035528733-Screenshot_20200612-092145144.jpg', 0),
(46, 'Yantoks', 'yayan2@mail.com', '1e6a67cce11488b8302dac39ef308d820a3c63a283dbbd1dcf1beb59187a37b20519cde24767fec2b026472b1fd083b5ce1fc8645e7aeca13ff1855cc1032066', '01c5e3866b3f1e7169', 'slur', 5, 'public/image/1596035556062-Screenshot_20200612-092238320.jpg', 0),
(47, 'Arfandy21', 'fafan21@mail.com', '08e4c96d0d004fd95db4ed07195cb9cc24886846677dfe3c496885d16d714cd65a5010e59e1466666e74b95eb06dd05061eda72d75ed679f737c513137feca90', 'ca924087becd4c4135', 'slur', 5, 'public/image/1596038079909-Screenshot (2).png', 0),
(48, 'Royb', 'roy@mail.com', '668858b14b1c260ade90afeb84f2461e194cb834136b7d500e057224b937ca167c7d8bf300fa7564a4063e84a7411e1a3c440918e38b940617c65fbe6604fd8a', '4c3775097791f2ab14', 'slur', 3, 'public/image/1596038964459-Screenshot (6).png', 0),
(49, 'yss', 'yss@mail.com', '8fa62b20ead9050dcf8fba3c2d863d27b1f27e09d96d84ae4de6d8d4642c9a239274863e879673e85a91627dee90b9cd901e827eaa150d87234fad90a58c0f14', '3b12db7c4a2f707397', 'slur', 2, 'public/image/default.png', 0),
(50, 'Uyes', 'yes@mail.com', 'ec732a39841391695cae86ebb9f6443b9433e56677c6ad47654446f62d25289c80a3d16e1320fee1c7e75b6cdcf4ac458261a5cb2ebaf60c4f03b62242674e73', '09255d470296556408', 'slur', 3, 'public/image/default.png', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
