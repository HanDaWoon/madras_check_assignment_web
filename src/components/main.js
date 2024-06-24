"use client";
import { useEffect, useState } from "react";
import { mFetch } from "@/util/MFetch";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { Input } from "postcss";

const Home = () => {
  const [openModal, setOpenModal] = useState(true);
  const [pagination, setPagination] = useState({
    totalRecordCount: 1,
    totalPageCount: 1,
    startPage: 1,
    endPage: 1,
    limitStart: 0,
    existPrev: false,
    existNext: false,
    paginationParam: {
      page: 1,
      recordSize: 10,
      pageSize: 5,
      offset: 0,
    },
  });
  const [ipAccessList, setIpAccessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddIp = async (e) => {
    e.preventDefault();
    console.log(e.target.ip.value);
    const ip = e.target.ip.value;
    const memo = e.target.memo.value;
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;

    await mFetch("/ip-access", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ipAddress: ip,
        memo: memo,
        startDate: startDate,
        endDate: endDate,
      }),
    }).then((res) => {
      if (res.ok) {
        fetchIpAccessList();
        onCloseModal();
      }
    });
  };

  const fetchIpAccessList = async () => {
    setLoading(true);
    try {
      const response = await mFetch("/ip-access", {
        credentials: "include",
      });
      const { data } = await response.json();
      setPagination(data.pagination);
      setIpAccessList(data.ipAccessList);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpAccessList().then((r) => r);
  }, []);

  return (
    <div>
      <section className="container px-4 mx-auto h-screen">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                IP 접근 설정
              </h2>
            </div>
          </div>

          <div className="flex items-center mt-4 gap-x-3">
            <button
              onClick={handleOpenModal}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>IP 추가</span>
            </button>
          </div>
        </div>

        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
              View all
            </button>

            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Monitored
            </button>

            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Unmonitored
            </button>
          </div>

          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search"
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            ></input>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-3 focus:outline-none">
                          <span>IP 주소</span>

                          <svg
                            className="h-3"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.1"
                            />
                            <path
                              d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.1"
                            />
                            <path
                              d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.3"
                            />
                          </svg>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        내용
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        사용 시작 시간
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        사용 끝 시간
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 max-h-[70vh]">
                    {loading ? (
                      <tr>
                        <td
                          className="px-4 py-4 text-sm whitespace-nowrap"
                          colSpan="4"
                        >
                          <div className="flex items-center justify-center">
                            <div className="w-8 h-8 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin"></div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      ipAccessList.map((ipAccess) => (
                        <tr key={ipAccess.id}>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            {ipAccess.ipAddress}
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            {ipAccess.memo}
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            {ipAccess.startDate}
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            {ipAccess.endDate}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page{" "}
            <span className="font-medium text-gray-700 dark:text-gray-100">
              {`${pagination.paginationParam.page} of ${pagination.totalPageCount}`}
            </span>
          </div>

          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
            <a
              href="#"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>previous</span>
            </a>

            <a
              href="#"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              IP 추가
            </h3>
            <form className="space-y-6" onSubmit={handleAddIp}>
              <div className="flex flex-col items-center">
                <div className="mb-2 block text-left w-full">
                  <Label htmlFor="ip" value="IP 주소" />
                </div>
                <div className="flex flex-row justify-between w-full">
                  <TextInput
                    id="ip"
                    type="text"
                    placeholder="000.000.000.000"
                    required
                  />
                  <Button size="sm" color="blue">
                    현재 IP 불러오기
                  </Button>
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="memo" value="설명" />
                </div>
                <TextInput
                  id="memo"
                  type="text"
                  placeholder="IP 주소에 대한 설명을 입력하세요."
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="startDate" value="허용 시작 시간" />
                </div>
                <TextInput id="startDate" type="datetime-local" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="endDate" value="하용 끝 시간" />
                </div>
                <TextInput id="endDate" type="datetime-local" required />
              </div>
              <div className="flex justify-between px-20">
                <Button size="lg" color="green" type="submit">
                  저장
                </Button>
                <Button size="lg" color="red" onClick={onCloseModal}>
                  취소
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
