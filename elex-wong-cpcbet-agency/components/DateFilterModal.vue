<template>
  <transition name="slideUp">
    <div class="dateFilterModal">
      <div class="dateFilterModal-empty-space" @click="handleCloseModal"></div>
      <div class="dateFilterModal-wrap">
        <div class="dateFilterModal-container">
          <div class="dateFilterModal-label">Date</div>

          <div class="dateFilterModal-datePick">
            <div class="dateFilterModal-select">
              <div class="dateFilterModal-select-label">From</div>
              <el-date-picker
                v-model="dateFrom"
                type="date"
                :placeholder="$t('pick_a_date')"
                :picker-options="pickerOptionsFrom"
              />
            </div>
            <div class="dateFilterModal-select">
              <div class="dateFilterModal-select-label">To</div>
              <el-date-picker
                v-model="dateTo"
                type="date"
                :placeholder="$t('pick_a_date')"
                :picker-options="pickerOptionsTo"
              />
            </div>
          </div>

          <div class="dateFilterModal-divider"></div>

          <div class="dateFilterModal-submit-buttons">
            <div class="dateFilterModal-button border-box" @click="resetButton">
              {{ $t("reset") }}
            </div>
            <div class="dateFilterModal-button fill-box" @click="submitFilter">
              {{ $t("filters") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "DateFilterModal",
  transitions: "slideUp",
  data() {
    return {
      dateFrom: null,
      dateTo: null,
      pickerOptionsTo: {
        disabledDate: this.disabledDatesTo,
      },
      pickerOptionsFrom: {
        disabledDate: this.disabledDatesFrom,
      },
    };
  },

  methods: {
    handleCloseModal() {
      this.$emit("close-modal");
    },

    disabledDatesTo(date) {
      if (this.dateFrom) {
        return this.dateFrom > date;
      }
      return false;
    },

    disabledDatesFrom(date) {
      if (this.dateTo) {
        return this.dateTo < date;
      }
      return false;
    },

    /* TODO: need to change the date format */
    submitFilter() {
      if (this.dateFrom == null && this.dateTo == null) {
        console.log("Empty vmodal");
        return false;
      }

      this.$emit("close-modal", this.dateFrom, this.dateTo);
    },

    resetButton() {
      this.dateFrom = null;
      this.dateTo = null;
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/dateFilterModal.scss";
@import "/assets/scss/mobile/dateFilterModal.scss";
</style>
