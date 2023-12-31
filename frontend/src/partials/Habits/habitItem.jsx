import { Button, Progress } from "@material-tailwind/react";
import useDailyCheck from "../../hooks/habit/useDailyCheck";
import useCloseHabit from "../../hooks/habit/useCloseHabit";
export default function habitItem({
  habitId,
  habitTitle,
  status,
  dueDate,
  createDate,
  openResultShareModal,
  openHabitShareModal,
  setSharedHabitId,
}) {
  const { trigger: dailyCheck } = useDailyCheck(habitId);
  const { trigger: closeHabit } = useCloseHabit(habitId);

  const handleCheck = async () => {
    await dailyCheck();
    window.location.reload();
  };

  const handleClose = async () => {
    await closeHabit();
    window.location.reload();
  };

  const calculateProgress = () => {
    const today = new Date();
    const createDateObj = new Date(createDate.slice(0, 10));
    const dueDateObj = new Date(dueDate.slice(0, 10));
    const totalTime = Math.abs(dueDateObj - createDateObj);
    const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24));
    const passedTimes = Math.abs(today - createDateObj);
    const passedDays = Math.ceil(passedTimes / (1000 * 60 * 60 * 24));
    const leftDays = totalDays - passedDays;
    const progressRate = Math.ceil((passedDays / totalDays) * 100);
    return { passedDays, totalDays, leftDays, progressRate };
  };

  const handleHabitShare = () => {
    setSharedHabitId(habitId);
    openHabitShareModal(true);
  };

  const handleResultShare = () => {
    setSharedHabitId(habitId);ㄦ
    openResultShareModal(true);
  };

  return (
    <>
      <div
        key={habitId}
        className="flex  flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 rounded-lg"
      >
        <div className="w-full sm:flex justify-between items-center p-4">
          <div>
            <div className="w-full mb-2 text-2xl sm:text-3xl font-bold whitespace-nowrap">{habitTitle}</div>
            <div className="w-full mb-2 text-lg sm:text-xl whitespace-nowrap">
              開始日：{createDate.slice(0, 10)}
            </div>
            <div className="md:text-3xl mb-2 whitespace-nowrap"></div>
            {status === "uncheck" || status === "checked" ? (
              <div className="text-g  md:text-l mb-2 whitespace-nowrap">
                進度 {calculateProgress().passedDays} 天 /{" "}
                {calculateProgress().totalDays} 天 (剩餘{" "}
                {calculateProgress().leftDays} 天)
              </div>
            ) : (
              <div className="mb-2">已截止</div>
            )}
            <Progress
              color="orange"
              value={calculateProgress().progressRate}
              size="lg"
            />
          </div>
          <div className="w-full flex justify-end m-2">
            {status === "uncheck" && (
              <>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleHabitShare}
                  className="text-lg sm:text-xl whitespace-nowrap m-1"
                >
                  查看賭注
                </Button>
                <Button className="text-lg sm:text-xl whitespace-nowrap m-1" color="green" onClick={handleCheck}>
                  簽到
                </Button>
              </>
            )}
            {status === "checked" && (
              <>
              <div className="w-full flex justify-start sm:justify-end">
                <Button
                  className="text-lg sm:text-xl whitespace-nowrap m-1"
                  color="green"
                  variant="outlined"
                  disabled="true"
                >
                  已簽到
                </Button>
                </div>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleHabitShare }
                  className="text-lg sm:text-xl whitespace-nowrap m-1"
                >
                  查看賭注
                </Button>
              </>
            )}
            {status === "due" && (
              <>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleHabitShare}
                  className="text-lg sm:text-xl whitespace-nowrap m-1"
                >
                  查看賭注
                </Button>
                <Button
                  className="text-lg m-2"
                  color="blue"
                  onClick={handleClose}
                >
                  結算
                </Button>
              </>
            )}
            {status === "win" && (
              <>
              <div className="w-full flex justify-start sm:justify-end">
                <Button
                  variant="outlined"
                  disabled="true"
                  className="text-lg text-yellow-500 font-bold sm:text-xl whitespace-nowrap m-1 border-yellow-500 border-2"
                >
                  贏了
                </Button>
                </div>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleResultShare}
                  className="text-lg sm:text-xl whitespace-nowrap m-1"
                >
                  查看結果
                </Button>
              </>
            )}
            {status === "lose" && (
              <>
              <div className="w-full flex justify-start sm:justify-end">
                <Button
                  variant="outlined"
                  disabled="true"
                  className="text-lg text-gray-700 font-bold sm:text-xl whitespace-nowrap m-1 border-gray-700 border-2"
                >
                  輸了
                </Button>
                </div>
                <Button
                  color="orange"
                  variant="text"
                  onClick={handleResultShare}
                  className="text-lg sm:text-xl whitespace-nowrap m-1"
                >
                  查看結果
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
