export default function DateRangePicker({
  startDate,
  endDate,
  currentLabel,
  onStartDateChange,
  onEndDateChange,
}) {

  const isCurrent = !endDate;
  const isCheckboxDisabled = !startDate;

  return (
    <div className="space-y-3">

      <div className="grid grid-cols-2 gap-3">

        <div>
          <label className="text-sm text-muted-foreground block mb-1">
            Start Date
          </label>

          <input
            type="month"
            value={startDate || ""}
            onChange={(e) =>
              onStartDateChange(e.target.value)
            }
            className="border border-border bg-transparent p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground block mb-1">
            End Date
          </label>

          <input
            type="month"
            disabled={isCurrent}
            value={endDate || ""}
            onChange={(e) =>
              onEndDateChange(e.target.value)
            }
            className="border border-border bg-transparent p-2 w-full rounded disabled:opacity-50"
          />
        </div>

      </div>

      <label className="flex items-center gap-2 text-sm">

        <input
          type="checkbox"
          checked={isCurrent}
          onChange={(e) =>
            onEndDateChange(
              e.target.checked
                ? ""
                : startDate
            )
          }
        />

        {currentLabel}

      </label>
      {isCheckboxDisabled && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Please select a start date first.
          </p>
        )}

    </div>
  );
}