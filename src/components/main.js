"use client";
import { useEffect, useState } from "react";
import { mFetch } from "@/util/mFetch";
import AddIpModal from "@/components/addIp";
import { Button, Label, Pagination, Select, TextInput } from "flowbite-react";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
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
  const [searchParam, setSearchParam] = useState({
    memo: "",
    startDate: "",
    endDate: "",
    page: 1,
    recordSize: 10,
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const fetchIpAccessList = async () => {
    setLoading(true);
    const urlSearchParams = new URLSearchParams();

    urlSearchParams.append("page", searchParam.page);
    urlSearchParams.append("recordSize", searchParam.recordSize);

    if (searchParam.memo) {
      urlSearchParams.append("memo", searchParam.memo);
    }
    if (searchParam.startDate) {
      urlSearchParams.append("startDate", searchParam.startDate);
    }
    if (searchParam.endDate) {
      urlSearchParams.append("endDate", searchParam.endDate);
    }

    try {
      const response = await mFetch(
        "/ip-access?" + urlSearchParams.toString(),
        {
          credentials: "include",
        },
      );
      const { data } = await response.json();
      setPagination(data.pagination);
      setIpAccessList(data.ipAccessList);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpAccessList().then((r) => r);
  }, [searchParam]);

  return (
    <div>
      <section className="container px-4 mx-auto h-screen">
        <h2 className="text-lg pt-4 font-medium text-gray-800">IP 접근 설정</h2>

        <div className="flex justify-between">
          <div className="flex justify-end items-end gap-4">
            <Label htmlFor="search_memo" className="text-xs font-medium">
              <TextInput
                id="search_memo"
                className="text-xs font-medium"
                type="text"
                icon={IoSearchSharp}
              />
            </Label>
            <Label htmlFor="search_start_date" className="text-xs font-medium">
              사용 시작 시간
              <TextInput
                id="search_start_date"
                className="text-xs font-medium"
                type="datetime-local"
              />
            </Label>
            <Label htmlFor="search_end_date" className="text-xs font-medium">
              사용 끝 시간
              <TextInput
                id="search_end_date"
                className="text-xs font-medium"
                type="datetime-local"
              />
            </Label>
            <Label htmlFor="record_size" className="text-xs font-medium">
              리스트 개수
              <Select
                id="record_size"
                value={searchParam.recordSize}
                onChange={(e) =>
                  setSearchParam({
                    ...searchParam,
                    page: 1,
                    recordSize: e.target.value,
                  })
                }
                required
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </Select>
            </Label>
          </div>
          <div className="flex items-center gap-x-3">
            <button
              onClick={handleOpenModal}
              className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 w-auto gap-x-2 hover:bg-blue-600"
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

        <div className="flex flex-col mt-3">
          <div className="-mx-8 overflow-x-auto">
            <div className="inline-block min-w-full align-middle px-8">
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        IP 주소
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

        <div className="mt-2 mb-4 flex overflow-x-auto items-center justify-center">
          <Pagination
            currentPage={pagination.paginationParam.page}
            totalPages={pagination.totalPageCount}
            onPageChange={(page) => setSearchParam({ ...searchParam, page })}
            showIcons
          />
        </div>
      </section>

      <AddIpModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchIpAccessList={fetchIpAccessList}
      />
    </div>
  );
};

export default Home;
