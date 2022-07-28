mapping_ng <- readxl::read_excel("no-inst/nr_labels_isco2_noga1.xlsx", "NOGA1", col_names = c("noga_letter", "label"))

for(i in 1:nrow(mapping_ng)) {
  cat(sprintf("{ value: '%s', label: '%s - %s' },\n", tolower(mapping_ng$noga_letter[i]), mapping_ng$noga_letter[i], mapping_ng$label[i]))
}
