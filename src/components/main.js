"use client";
import { useEffect, useState } from "react";
import { mFetch } from "@/util/mFetch";
import AddIpModal from "@/components/addIp";
import { Button, Label, Pagination, Select, TextInput } from "flowbite-react";
import { IoSearchSharp } from "react-icons/io5";
import {
  dateTimeFormatIso,
  dateTimeStringToLocalDateTime,
} from "@/util/dateHandling";

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

  const handleDelete = async (id) => {
    try {
      const response = await mFetch(`/ip-access/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      if (response.ok) {
        await fetchIpAccessList();
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSearchParamChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setSearchParam({ ...searchParam, [id]: value });
  };

  const resetSearchParam = () => {
    setSearchParam({
      memo: "",
      startDate: "",
      endDate: "",
      page: 1,
      recordSize: 10,
    });
  };

  const fetchIpAccessList = async () => {
    const urlSearchParams = new URLSearchParams();

    urlSearchParams.append("page", searchParam.page);
    urlSearchParams.append("recordSize", searchParam.recordSize);

    if (searchParam.memo) {
      urlSearchParams.append("memo", searchParam.memo);
    }
    if (searchParam.startDate) {
      urlSearchParams.append(
        "startDate",
        dateTimeFormatIso(searchParam.startDate),
      );
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
                id="memo"
                className="text-xs font-medium"
                type="text"
                icon={IoSearchSharp}
                value={searchParam.memo}
                onChange={(e) => handleSearchParamChange(e)}
              />
            </Label>
            <Label htmlFor="search_start_date" className="text-xs font-medium">
              사용 시작 시간
              <TextInput
                id="startDate"
                className="text-xs font-medium"
                type="datetime-local"
                value={searchParam.startDate}
                onChange={(e) => handleSearchParamChange(e)}
              />
            </Label>
            <Label htmlFor="search_end_date" className="text-xs font-medium">
              사용 끝 시간
              <TextInput
                id="endDate"
                className="text-xs font-medium"
                type="datetime-local"
                value={searchParam.endDate}
                onChange={(e) => handleSearchParamChange(e)}
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
            <Button onClick={resetSearchParam}>초기화</Button>
          </div>
          <div className="flex items-center gap-x-3">
            <Button onClick={handleOpenModal} color="purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              IP 추가
            </Button>
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
                        className="py-3.5 px-4 text-sm font-normal text-left text-gray-500"
                      >
                        IP 주소
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        내용
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        사용 시작 시간
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500"
                      >
                        사용 끝 시간
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 max-h-[70vh]">
                    {ipAccessList.map((ipAccess) => (
                      <tr key={ipAccess.id}>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {ipAccess.ipAddress}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {ipAccess.memo}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {dateTimeStringToLocalDateTime(ipAccess.startDate)}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap flex justify-between items-center">
                          {dateTimeStringToLocalDateTime(ipAccess.endDate)}
                          <Button
                            size="xs"
                            color="red"
                            className="mr-20"
                            onClick={() => handleDelete(ipAccess.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
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
